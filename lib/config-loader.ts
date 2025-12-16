import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

import { createJiti } from "jiti";
import { load } from "js-yaml";
import MarkdownIt from "markdown-it";

import type { Config, Content, LocaleConfig } from "../src/types/index.js";

const require = createRequire(import.meta.url);
const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

export const configFiles = [
  "config.ts",
  "config.js",
  "config.json",
  "config.yml",
  "config.yaml",
];

const processMarkdown = (content: string): string => {
  if (!content) return "";

  return md.renderInline(content);
};

const processContent = (content: Content): Content => {
  const newContent = { ...content };

  switch (newContent.type) {
    case "banner":
      if (newContent.subtitle) {
        newContent.subtitle = processMarkdown(newContent.subtitle);
      }
      if (newContent.data.content) {
        newContent.data = {
          ...newContent.data,
          content: processMarkdown(newContent.data.content),
        };
      }
      break;

    case "cards":
      newContent.data = newContent.data.map((item) => ({
        ...item,
        title: processMarkdown(item.title),
        ...(item.description
          ? { description: processMarkdown(item.description) }
          : {}),
      }));
      break;

    case "experience":
      newContent.data = newContent.data.map((item) => ({
        ...item,
        ...(item.title ? { title: processMarkdown(item.title) } : {}),
        ...(item.description
          ? { description: processMarkdown(item.description) }
          : {}),
        ...(item.content ? { content: processMarkdown(item.content) } : {}),
      }));
      break;

    case "list":
      newContent.data = newContent.data.map((item) =>
        typeof item === "object"
          ? {
              ...item,
              text: processMarkdown(item.text),
            }
          : processMarkdown(item),
      );
      break;

    case "profile": {
      // ProfileData: fields, contact, slogan
      const processedData = { ...newContent.data };

      // slogan 字段 markdown
      if (processedData.slogan) {
        processedData.slogan = processMarkdown(processedData.slogan);
      }
      // fields.value 为 string 时 markdown
      if (Array.isArray(processedData.fields)) {
        processedData.fields = processedData.fields.map((field) => ({
          ...field,
          value:
            typeof field.value === "string"
              ? processMarkdown(field.value)
              : field.value,
        }));
      }
      newContent.data = processedData;
      break;
    }

    case "timeline":
      newContent.data = newContent.data.map((item) => ({
        ...item,
        content: processMarkdown(item.content),
      }));
      break;

    case "paragraph":
      newContent.data = processMarkdown(newContent.data);
      break;
  }

  return newContent;
};

const processConfig = (config: LocaleConfig): LocaleConfig => {
  return {
    ...config,
    contents: config.contents.map(processContent),
    footer: config.footer
      ? {
          ...config.footer,
          ...(config.footer.copyright
            ? { copyright: processMarkdown(config.footer.copyright) }
            : {}),
          ...(config.footer.description
            ? { description: processMarkdown(config.footer.description) }
            : {}),
        }
      : undefined,
  };
};

export const loadConfig = async (root: string): Promise<Config> => {
  for (const file of configFiles) {
    const filePath = path.resolve(root, file);

    if (fs.existsSync(filePath)) {
      try {
        let config: Config;

        if (file.endsWith(".json")) {
          const content = fs.readFileSync(filePath, "utf-8");

          config = JSON.parse(content) as Config;
        } else if (file.endsWith(".yml") || file.endsWith(".yaml")) {
          const content = fs.readFileSync(filePath, "utf-8");

          config = load(content) as Config;
        } else {
          // Clear require cache
          try {
            const dependencies = getConfigDependencies(root);

            for (const dep of dependencies) {
              delete require.cache[dep];
            }
            delete require.cache[filePath];
          } catch {
            // Ignore errors clearing cache
          }

          const jiti = createJiti(import.meta.url, {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
            fsCache: false as any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
            moduleCache: false as any,
          });
          const mod = await jiti.import(filePath);

          config = (mod as { default: Config }).default;
        }

        return {
          ...config,
          locales: Object.fromEntries(
            Object.entries(config.locales).map(([path, localeConfig]) => [
              path,
              processConfig(localeConfig),
            ]),
          ),
        };
      } catch (err) {
        throw new Error(`Error parsing ${file}: ${String(err)}`);
      }
    }
  }

  throw new Error(
    "No configuration file found. Please create one of the following files: config.ts, config.js, config.json, config.yml, config.yaml",
  );
};

const getImports = (filePath: string): string[] => {
  const content = fs.readFileSync(filePath, "utf-8");
  const imports: string[] = [];
  const regex = /(?:import|export)(?:[\s\S]*?from\s+|\s+)['"](\.[^'"]+)['"]/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  return imports;
};

const resolveImport = (basePath: string, importPath: string): string | null => {
  if (!importPath.startsWith(".")) return null;

  const extensions = ["", ".ts", ".js", ".tsx", ".jsx", ".json"];
  const resolvePath = path.resolve(basePath, importPath);

  for (const ext of extensions) {
    const p = resolvePath + ext;

    if (fs.existsSync(p) && fs.statSync(p).isFile()) return p;
  }

  // Handle .js -> .ts mapping
  if (resolvePath.endsWith(".js")) {
    const tsPath = resolvePath.replace(/\.js$/, ".ts");

    if (fs.existsSync(tsPath) && fs.statSync(tsPath).isFile()) return tsPath;
  }

  return null;
};

export const getConfigDependencies = (root: string): string[] => {
  const dependencies = new Set<string>();
  let entryFile = "";

  for (const file of configFiles) {
    const p = path.resolve(root, file);

    if (fs.existsSync(p)) {
      entryFile = p;
      break;
    }
  }

  if (!entryFile) return [];

  const queue = [entryFile];
  const visited = new Set<string>();

  while (queue.length > 0) {
    const currentFile = queue.shift();

    if (!currentFile || visited.has(currentFile)) continue;
    visited.add(currentFile);
    dependencies.add(currentFile);

    // Only parse JS/TS files
    if (!/\.(js|ts|jsx|tsx|mjs|cjs)$/.test(currentFile)) continue;

    try {
      const imports = getImports(currentFile);
      const dir = path.dirname(currentFile);

      for (const imp of imports) {
        const resolved = resolveImport(dir, imp);

        if (resolved && !resolved.includes("node_modules")) {
          queue.push(resolved);
        }
      }
    } catch {
      // Ignore errors reading files
    }
  }

  return Array.from(dependencies);
};
