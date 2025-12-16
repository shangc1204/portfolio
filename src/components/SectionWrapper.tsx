import type { FC, ReactNode } from "react";

import { isCJKLocale } from "../helper.js";
import { Icon } from "./Icon.js";

/**
 * Props for the SectionWrapper component
 * SectionWrapper 组件的属性
 */
interface Props {
  /**
   * Section title
   * 章节标题
   */
  title: string;
  /**
   * Optional icon name (e.g., "user")
   * 可选的图标名称 (例如 "user")
   */
  icon?: string;
  /**
   * Child components to render within the section
   * 在章节内渲染的子组件
   */
  children: ReactNode;
  /**
   * HTML ID attribute for navigation anchors
   * 用于导航锚点的 HTML ID 属性
   */
  id?: string;
  /**
   * Current locale
   * 当前语言
   */
  locale?: string;
}

/**
 * SectionWrapper component
 *
 * A wrapper component that provides consistent styling, spacing, and headers for content sections.
 *
 * 章节包装器组件
 *
 * 为内容章节提供一致的样式、间距和标题的包装器组件。
 */
export const SectionWrapper: FC<Props> = ({
  title,
  icon,
  children,
  id,
  locale,
}) => {
  const isCJK = isCJKLocale(locale);

  return (
    <section id={id} className="section-container">
      <div className="section-content-wrapper">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-title-row">
            {icon && <Icon icon={icon} className="section-icon" />}
            <h2
              className={`heading-section ${isCJK ? "" : "tracking-tighter"}`}
            >
              {title}
            </h2>
          </div>
          <div className="section-divider" />
        </div>

        {/* Content Area */}
        <div className="section-children">{children}</div>
      </div>
    </section>
  );
};
