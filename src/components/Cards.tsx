import type { FC } from "react";
import { isCJKLocale } from "../helper.js";
import { Icon } from "./Icon.js";
import { RichContent } from "./RichContent.js";

/**
 * Card item for projects or highlights
 * 项目或亮点的卡片项
 */
export interface CardItem {
  /**
   * Card title
   * 卡片标题
   */
  title: string;

  /**
   * Link URL
   * 链接地址
   */
  link: string;
  /**
   * Category label (e.g., "Thesis")
   * 类别标签 (例如 "学位论文")
   */
  category?: string;
  /**
   * Action button label (e.g., "View PDF")
   * 操作按钮标签 (例如 "查看 PDF")
   */
  action?: string;
  /**
   * Icon class for the action button
   * 操作按钮的图标类名
   */
  icon?: string;
  /**
   * Optional description
   * 可选描述
   */
  description?: string;
}

export interface CardsProps {
  /**
   * List of card items
   * 卡片项列表
   */
  items: CardItem[];
  /**
   * Current locale
   * 当前语言
   */
  locale?: string;
}

/**
 * Cards component
 *
 * Displays a grid of cards, typically for theses or projects.
 *
 * 卡片组件
 *
 * 显示卡片网格，通常用于学位论文或项目。
 */
export const Cards: FC<CardsProps> = ({ items, locale }) => {
  const isCJK = isCJKLocale(locale);

  return (
    <div className="card-grid">
      {items.map((card, idx) => (
        <a
          key={idx}
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group card-base card-item card-hover"
        >
          <div className="card-decoration" />
          <div className="relative z-10">
            {card.category && (
              <h4 className={`label-sm mb-3 ${isCJK ? "" : "tracking-widest"}`}>
                {card.category}
              </h4>
            )}
            <h3 className="card-title">
              <RichContent content={card.title} />
            </h3>
            {card.description && (
              <RichContent
                className="card-description"
                content={card.description}
                block
              />
            )}
            {(card.action || card.icon) && (
              <span
                className={`card-action ${isCJK ? "" : "tracking-[0.2em]"}`}
              >
                {card.action}
                {card.icon && <Icon icon={card.icon} className="text-lg" />}
              </span>
            )}
          </div>
        </a>
      ))}
    </div>
  );
};
