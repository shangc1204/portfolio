import type { Content } from "./content.js";
import type { HeroConfig } from "./hero.js";
import type { NavbarConfig } from "./navbar.js";
import type { ExperienceStyle } from "../components/Experience.js";
import type { FooterProps } from "../components/Footer.js";

/**
 * Main application configuration
 * 应用程序主配置
 */
export interface LocaleConfig {
  /**
   * Language name (e.g., "English", "简体中文")
   * 语言名称
   */
  langName?: string;

  /**
   * Website title
   * 网站标题
   */
  title?: string;

  /**
   * Website description
   * 网站描述
   */
  description?: string;

  /**
   * Hero section configuration
   * 首屏区域配置
   */
  hero: HeroConfig;

  /**
   * Navbar configuration
   * 导航栏配置
   */
  navbar?: NavbarConfig;

  /**
   * Content to display
   * 要显示的内容
   */
  contents: Content[];

  /**
   * Footer configuration
   * 页脚配置
   */
  footer?: Partial<FooterProps>;

  /**
   * UI translation strings
   * 界面翻译字符串
   */
  ui?: {
    /**
     * Tooltip text for theme toggler
     * 主题切换器的提示文本
     */
    themeToggle?: string;
    /**
     * Label for contact
     * 联系方式标签
     */
    contact?: string;
  };
}

export interface Config {
  experienceStyles?: Record<string, ExperienceStyle>;

  locales: Record<string, LocaleConfig>;
}
