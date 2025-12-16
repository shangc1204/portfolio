import type { BannerData } from "../components/Banner.js";
import type { CardItem } from "../components/Cards.js";
import type { ExperienceItem } from "../components/Experience.js";
import type { GalleryItem } from "../components/Gallery.js";
import type { ListItem, ListProps } from "../components/List.js";
import type { ProfileData } from "../components/Profile.js";
import type { TimelineItem, TimelineProps } from "../components/Timeline.js";

/**
 * Supported content block types
 * 支持的内容块类型
 */
export type ContentType =
  | "profile"
  | "experience"
  | "banner"
  | "timeline"
  | "cards"
  | "list"
  | "gallery"
  | "paragraph";

export interface ContentBase {
  /**
   * Unique identifier for the block (used for navigation)
   * 块的唯一标识符 (用于导航)
   */
  id: string;
  /**
   * Section title
   * 章节标题
   */
  title: string;
  /**
   * Section icon class
   * 章节图标类名
   */
  icon?: string;
  /**
   * Section subtitle
   * 章节副标题
   */
  subtitle?: string;
}

export interface ProfileContent extends ContentBase {
  type: "profile";
  data: ProfileData;
}

export interface ExperienceContent extends ContentBase {
  type: "experience";
  data: ExperienceItem[];
}

export interface BannerContent extends ContentBase {
  type: "banner";
  data: BannerData;
}

export interface TimelineContent
  extends ContentBase, Omit<TimelineProps, "items"> {
  type: "timeline";
  data: TimelineItem[];
}

export interface CardsContent extends ContentBase {
  type: "cards";
  data: CardItem[];
}

export interface ListContent extends ContentBase, Omit<ListProps, "items"> {
  type: "list";
  data: (ListItem | string)[];
}

export interface GalleryContent extends ContentBase {
  type: "gallery";
  data: GalleryItem[];
}

export interface ParagraphContent extends ContentBase {
  type: "paragraph";
  data: string;
  /**
   * Whether to display as a card
   * 是否显示为卡片
   */
  card?: boolean;
}

/**
 * Configuration for a content block
 * 内容块配置
 */
export type Content =
  | ParagraphContent
  | ListContent
  | BannerContent
  | CardsContent
  | TimelineContent
  | ProfileContent
  | ExperienceContent
  | GalleryContent;
