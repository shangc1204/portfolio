import type { FC } from "react";
import { Icon } from "./Icon.js";
import { RichContent } from "./RichContent.js";

/**
 * Timeline item for news or events
 * 新闻或事件的时间轴项
 */
export interface TimelineItem {
  /**
   * Year or date string
   * Year or date (string or number)
   * 年份或日期（字符串或数字）
   */
  year: string | number;
  /**
   * Event content (Markdown supported)
   * 事件内容 (支持 Markdown)
   */
  content: string;
  /**
   * Optional link URL
   * 可选链接地址
   */
  link?: string;
  /**
   * Text for the link
   * 链接文本
   */
  linkText?: string;
}

export interface TimelineProps {
  /**
   * List of timeline items to display
   * 要显示的时间轴项列表
   */
  items: TimelineItem[];

  /**
   * Style of the timeline: "line" or "cards"
   * 时间轴的样式: "line" 或 "cards"
   *
   * @default 'line'
   */
  style?: "line" | "cards";
}

/**
 * Timeline component
 *
 * Displays a list of events or news items by tune
 *
 * 时间轴组件
 *
 * 按时间顺序显示事件或新闻项的列表
 */
export const Timeline: FC<TimelineProps> = ({ items, style = "line" }) => {
  if (style === "cards") {
    return (
      <div className="timeline-cards-grid">
        {items.map((item, idx) => (
          <div key={idx} className="group card-base card-hover timeline-card">
            <div className="timeline-year-col">
              <span className="timeline-year-text"> {String(item.year)}</span>
            </div>

            <div className="timeline-content-col">
              <RichContent
                content={item.content}
                className="text-content"
                block
              />
            </div>

            {item.link && (
              <div className="timeline-link-col">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="timeline-link-btn"
                >
                  {item.linkText ?? "Detail"}
                  <Icon
                    icon="arrow-up-right-from-square"
                    className="text-[10px]"
                  />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Default 'line' style
  return (
    <div className="timeline-list">
      {items.map((item, idx) => (
        <div key={idx} className="group timeline-list-item">
          {/* Timeline Line */}
          {idx !== items.length - 1 && <div className="timeline-line" />}

          {/* Timeline Node - Simple small solid primary dot */}
          <div className="timeline-dot" />

          <div className="timeline-list-content">
            {/* Year Badge */}
            <div className="timeline-header">
              <span className="badge">{item.year}</span>
              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="timeline-link-icon"
                >
                  <Icon
                    icon="arrow-up-right-from-square"
                    className="text-[9px]"
                  />
                </a>
              )}
            </div>

            {/* Content Box - Reduced padding */}
            <div className="timeline-box">
              <RichContent
                content={item.content}
                className="text-content"
                block
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
