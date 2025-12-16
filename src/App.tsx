import type { FC, ReactElement } from "react";
import { useState, useEffect } from "react";
import { Hero } from "./components/Hero.js";
import { SectionWrapper } from "./components/SectionWrapper.js";
import { Experience } from "./components/Experience.js";
import { Timeline } from "./components/Timeline.js";
import { Gallery } from "./components/Gallery.js";
import { Banner } from "./components/Banner.js";
import { Navbar } from "./components/Navbar.js";
import { Profile } from "./components/Profile.js";
import { Cards } from "./components/Cards.js";
import { List } from "./components/List.js";
import { Paragraph } from "./components/Paragraph.js";
import { Footer } from "./components/Footer.js";
import type { LocaleConfig, Content } from "./types/index.js";

const { experienceStyles, locales } = __CONFIG__;
const localePaths = Object.keys(locales);

const getLocaleFromPath = (path: string): string => {
  const sortedPaths = [...localePaths].sort((a, b) => b.length - a.length);

  for (const localePath of sortedPaths) {
    if (localePath === "/") continue;
    if (path.startsWith(localePath)) return localePath;
  }

  return "/";
};

export const App: FC<{ initialLocale?: string }> = ({ initialLocale }) => {
  const [locale, setLocale] = useState<string>(() => {
    if (initialLocale) return initialLocale;
    if (typeof window !== "undefined")
      return getLocaleFromPath(window.location.pathname);

    return localePaths[0];
  });
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");

      if (saved) return saved as "light" | "dark";

      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    return "light";
  });
  const [config, setConfig] = useState<LocaleConfig>(locales[locale]);

  useEffect(() => {
    document.title = config.title ?? "Portfolio";

    let metaDescription = document.querySelector('meta[name="description"]');

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute(
      "content",
      config.description ?? "Portfolio Template",
    );
  }, [config]);

  useEffect(() => {
    setConfig(locales[locale]);

    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname;
      const newPath = locale === "/" ? "/" : locale;

      if (
        currentPath !== newPath &&
        !(currentPath === "/" && newPath === "/")
      ) {
        window.history.pushState(null, "", newPath);
      }
    }
  }, [locale]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onPopState = (): void => {
        setLocale(getLocaleFromPath(window.location.pathname));
      };

      window.addEventListener("popstate", onPopState);

      return (): void => {
        window.removeEventListener("popstate", onPopState);
      };
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = (): void =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const handleLocaleChange = (): void => {
    const currentIndex = localePaths.indexOf(locale);
    const nextIndex = (currentIndex + 1) % localePaths.length;

    setLocale(localePaths[nextIndex]);
  };

  const nextLocale =
    localePaths[(localePaths.indexOf(locale) + 1) % localePaths.length];
  const nextLocaleName = locales[nextLocale].langName ?? "Switch Language";

  const renderContent = (content: Content): ReactElement | null => {
    switch (content.type) {
      case "profile":
        return <Profile data={content.data} ui={config.ui} />;

      case "experience":
        return (
          <Experience
            items={content.data}
            locale={locale}
            styles={experienceStyles}
          />
        );

      case "banner": {
        return (
          <Banner
            title={content.title}
            subtitle={content.subtitle ?? ""}
            content={content.data.content}
            footer={content.data.footer}
            actions={content.data.actions}
          />
        );
      }

      case "timeline":
        return <Timeline items={content.data} style={content.style} />;

      case "cards":
        return <Cards items={content.data} locale={locale} />;

      case "list":
        return <List dot={content.dot} items={content.data} />;

      case "gallery":
        return <Gallery items={content.data} />;

      case "paragraph":
        return <Paragraph content={content.data} card={content.card} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen selection:bg-primary-100 dark:selection:bg-primary-900 selection:text-primary-900 dark:selection:text-primary-100">
      {config.navbar && (
        <Navbar
          links={config.navbar.links}
          nextLocaleName={nextLocaleName}
          onLocaleChange={handleLocaleChange}
          theme={theme}
          onThemeChange={toggleTheme}
          themeLabel={config.ui?.themeToggle}
          brand={config.hero.name}
          showLocaleSwitch={localePaths.length > 1}
        />
      )}

      <Hero hero={config.hero} locale={locale} />

      <main className="container mx-auto px-6 max-w-7xl mt-12 md:mt-16">
        {config.contents.map((block) => (
          <SectionWrapper
            key={block.id}
            title={block.title}
            icon={block.icon}
            id={block.id}
            locale={locale}
          >
            {renderContent(block)}
          </SectionWrapper>
        ))}
      </main>

      <Footer
        copyright={config.footer?.copyright ?? config.hero.name}
        description={config.footer?.description}
      />
    </div>
  );
};
