import path from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import type { ViteDevServer } from "vite";
import { defineConfig } from "vite";

import {
  configFiles,
  getConfigDependencies,
  loadConfig,
} from "./lib/config-loader.js";
import { ssgPlugin } from "./lib/ssg-plugin.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(async () => {
  const config = await loadConfig(__dirname);

  return {
    define: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __CONFIG__: JSON.stringify(config),
    },
    server: {
      port: 3000,
      host: "0.0.0.0",
    },
    plugins: [
      react(),
      tailwindcss({}),
      ssgPlugin(),
      {
        name: "inject-title",
        transformIndexHtml(html: string): string {
          const locales = Object.keys(config.locales);
          const defaultLocale = locales[0];

          const title = config.locales[defaultLocale].title ?? "Portfolio";

          return html.replace(
            /<title>(.*?)<\/title>/,
            `<title>${title}</title>`,
          );
        },
      },
      {
        name: "watch-config",
        configureServer(server: ViteDevServer): void {
          const configPath = path.resolve(__dirname, "config");
          const configDependencies = getConfigDependencies(__dirname);

          server.watcher.add(configPath);
          server.watcher.add(
            configFiles.map((f) => path.resolve(__dirname, f)),
          );
          server.watcher.add(configDependencies);

          server.watcher.on("change", (file: string) => {
            if (
              file.startsWith(configPath) ||
              configFiles.some((f) => file === path.resolve(__dirname, f)) ||
              configDependencies.includes(file)
            ) {
              void server.restart();
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        "@": path.resolve(__dirname, "."),
      },
    },
  };
});
