import type { FC } from "react";
import { RichContent } from "./RichContent.js";

export interface ParagraphProps {
  /**
   * Content text (Markdown supported)
   * 内容文本 (支持 Markdown)
   */
  content: string;
  /**
   * Whether to display as a card
   * 是否显示为卡片
   */
  card?: boolean;
}

/**
 * Paragraph component
 *
 * Displays a simple text block with glassmorphism styling.
 *
 * 段落组件
 *
 * 显示带有玻璃拟态样式的简单文本块。
 */
export const Paragraph: FC<ParagraphProps> = ({ content, card = false }) => {
  if (card)
    return (
      <div className="card-base p-8 md:p-10 text-content font-medium">
        <RichContent content={content} />
      </div>
    );

  return (
    <div className="text-content font-medium">
      <RichContent content={content} />
    </div>
  );
};
