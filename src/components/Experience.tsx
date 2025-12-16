import type { FC } from "react";
import { Icon } from "./Icon.js";
import { RichContent } from "./RichContent.js";

/**
 * Style configuration for experience types
 * 经历类型的样式配置
 */
export interface ExperienceStyle {
  /**
   * Background class for the timeline node (e.g., "bg-indigo-600")
   * 时间轴节点的背景类名
   */
  background: string;
  /**
   * Icon class for the timeline node (e.g., "fa-book-open")
   * 时间轴节点的图标类名
   */
  icon: string;
  /**
   * Background/Text class for the content icon box (e.g., "bg-indigo-50 text-indigo-600")
   * 内容图标框的背景/文本类名
   */
  iconBox: string;
}

/**
 * Experience item (work or study)
 * 经历项 (工作或学习)
 */
export interface ExperienceItem {
  /**
   * Type of experience
   * 经历类型
   */
  type: string;
  /**
   * Place/Institution name
   * 地点/机构名称
   */
  place: string;
  /**
   * Job title or Degree
   * 职位或学位
   */
  title?: string;
  /**
   * Time period (e.g., "2020 - 2024")
   * 时间段 (例如 "2020 - 2024")
   */
  time: string;
  /**
   * Main content/description (Markdown supported)
   * 主要内容/描述 (支持 Markdown)
   */
  content?: string;
  /**
   * Additional detailed description (Markdown supported)
   * 额外详细描述 (支持 Markdown)
   */
  description?: string;
  /**
   * Optional custom icon
   * 可选自定义图标
   */
  icon?: string;
}

export interface ExperienceProps {
  /**
   * List of experience items to display
   * 要显示的经历项列表
   */
  items: ExperienceItem[];
  /**
   * Custom styles for experience types
   * 经历类型的自定义样式
   */
  styles?: Record<string, ExperienceStyle>;
  /**
   * Current locale
   * 当前语言
   */
  locale?: string;
}

const defaultStyles: Record<string, ExperienceStyle> = {
  work: {
    background: "bg-emerald-600",
    icon: "briefcase",
    iconBox:
      "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
  },
  study: {
    background: "bg-indigo-600",
    icon: "graduation-cap",
    iconBox:
      "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400",
  },
  volunteer: {
    background: "bg-amber-500",
    icon: "handshake-angle",
    iconBox:
      "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400",
  },
  vacation: {
    background: "bg-sky-500",
    icon: "umbrella-beach",
    iconBox: "bg-sky-50 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400",
  },
  project: {
    background: "bg-purple-600",
    icon: "laptop-code",
    iconBox:
      "bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
  },
};

/**
 * Experience component
 *
 * Displays a vertical timeline of work and study experiences.
 *
 * 经历组件
 *
 * 显示工作和学习经历的垂直时间轴。
 */
export const Experience: FC<ExperienceProps> = ({ items, styles = {} }) => {
  const mergedStyles = { ...defaultStyles, ...styles };

  const getStyle = (type: string): ExperienceStyle =>
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    mergedStyles[type] || mergedStyles.work;

  return (
    <div className="experience-list">
      {items.map(
        ({ place, time, description, type, icon, title, content }, index) => {
          const style = getStyle(type);

          return (
            <div key={index} className="group experience-item">
              {/* Individual Timeline Line segment */}
              {index !== items.length - 1 && (
                <div className="experience-line" />
              )}

              {/* Timeline Node */}
              <div className={`experience-node ${style.background}`} />

              <div className="flex flex-col gap-2 md:gap-3">
                {/* Top Meta: Time & Location */}
                <div className="experience-meta">
                  <span className="badge">{time}</span>
                  <div className="experience-location">
                    <Icon icon="location-dot" className="flex-shrink-0" />
                    <span className="block min-w-0 text-left leading-tight">
                      {place}
                    </span>
                  </div>
                </div>

                {/* Content Box */}
                <div className="card-base experience-card card-hover">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className={`experience-icon-box ${style.iconBox}`}>
                      <Icon
                        icon={icon ?? style.icon}
                        className="text-lg md:text-2xl"
                      />
                    </div>
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <h3 className="experience-title">
                        <RichContent content={title ?? ""} />
                      </h3>
                      {content && (
                        <RichContent
                          className="text-content"
                          content={content}
                          block
                        />
                      )}
                      {description && (
                        <RichContent
                          content={description}
                          className="experience-description"
                          block
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        },
      )}
    </div>
  );
};
