import type { FC } from "react";
import { Icon } from "./Icon.js";
import { RichContent } from "./RichContent.js";

/**
 * List item for publications, awards, etc.
 * 出版物、奖项等的列表项
 */
export interface ListItem {
  /**
   * Item text (Markdown supported)
   * 列表项文本 (支持 Markdown)
   */
  text: string;
  /**
   * Optional link URL
   * 可选链接地址
   */
  link?: string;
}

export interface ListProps {
  /**
   * List of items
   * 列表项
   */
  items: (ListItem | string)[];
  /**
   * Whether the list is unordered
   * 列表是否为无序列表
   */
  unordered?: boolean;
  /**
   * Style of list markers for unordered lists
   * 无序列表的列表标记样式
   */
  dot?: "circle" | "square" | "diamond" | "check" | "none";
}

/**
 * List component
 *
 * Displays a list of items with configurable styling.
 *
 * 列表组件
 *
 * 显示带有可配置样式的项目列表。
 */
export const List: FC<ListProps> = ({ items, unordered, dot }) => {
  const ListTag = unordered ? "ul" : "ol";
  const listStyle = dot ?? "circle";

  return (
    <ListTag className={unordered ? "list-ul" : "list-ol"}>
      {items.map((item, i) => (
        <li
          key={i}
          className={`text-content ${unordered ? "list-li-unordered" : "list-li-ordered"}`}
        >
          {unordered && listStyle !== "none" && (
            <div className="list-marker-container">
              {listStyle === "check" && (
                <Icon icon="circle-check" className="list-marker-check" />
              )}
              {listStyle === "circle" && <div className="list-marker-circle" />}
              {listStyle === "square" && <div className="list-marker-square" />}
              {listStyle === "diamond" && (
                <div className="list-marker-diamond" />
              )}
            </div>
          )}
          <div className="list-content">
            {typeof item === "object" && item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="list-link"
              >
                <RichContent content={item.text} />
              </a>
            ) : (
              <RichContent
                content={typeof item === "object" ? item.text : item}
              />
            )}
          </div>
        </li>
      ))}
    </ListTag>
  );
};
