import type { FooterProps } from "./components/Footer.js";
import type {
  BannerContent,
  CardsContent,
  Config,
  Content,
  ExperienceContent,
  GalleryContent,
  HeroConfig,
  ListContent,
  NavbarConfig,
  ParagraphContent,
  ProfileContent,
  TimelineContent,
} from "./types/index.js";

/**
 * Helper function to define configuration with type safety
 * 定义配置的辅助函数，提供类型安全
 */
export const defineConfig = (config: Config): Config => config;

export const defineHeroConfig = (config: HeroConfig): HeroConfig => config;

export const defineNavbarConfig = (config: NavbarConfig): NavbarConfig =>
  config;

export const defineContents = (config: Content[]): Content[] => config;

export const defineFooterConfig = (
  config: Partial<FooterProps>,
): Partial<FooterProps> => config;

export const defineProfileContent = (config: ProfileContent): ProfileContent =>
  config;

export const defineExperienceContent = (
  config: ExperienceContent,
): ExperienceContent => config;

export const defineBannerContent = (config: BannerContent): BannerContent =>
  config;

export const defineTimelineContent = (
  config: TimelineContent,
): TimelineContent => config;

export const defineCardsContent = (config: CardsContent): CardsContent =>
  config;

export const defineListContent = (config: ListContent): ListContent => config;

export const defineGalleryContent = (config: GalleryContent): GalleryContent =>
  config;

export const defineParagraphContent = (
  config: ParagraphContent,
): ParagraphContent => config;

/**
 * Check if the locale is a CJK locale (Chinese, Japanese, Korean)
 * 检查语言环境是否为 CJK 语言环境 (中文、日文、韩文)
 */
export const isCJKLocale = (locale?: string): boolean => {
  if (!locale) return false;

  return ["zh", "ja", "ko"].includes(locale);
};
