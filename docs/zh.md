# 全局配置指南

应用程序由单个配置对象控制。

## 🚀 快速开始

1.  从 `examples/` 复制一个示例配置文件到根目录（例如 `cp examples/config.example.yml config.yml`）。
2.  编辑 `config.yml` 以自定义您的作品集。

支持的配置文件格式：`config.ts`, `config.js`, `config.json`, `config.yml`, `config.yaml`。

## 配置结构 (`Config`)

配置文件默认导出一个 `Config` 对象，包含以下字段：

- `locales`: 对象 (Object). 多语言配置映射。键是路径前缀 (例如 `"/"`, `"/zh/"`)，值是 `LocaleConfig` 对象。
- `experienceStyles`: 可选对象 (Optional Object). 自定义经历组件的样式映射。

## 多语言配置 (`LocaleConfig`)

在 `locales` 对象中，每个语言的配置包含以下字段：

- `langName`: 字符串 (String). 语言名称 (例如 "English", "简体中文")。
- `title`: 字符串 (String). 网站标题。
- `description`: 字符串 (String). 网站描述。
- `hero`: 对象 (Object). 首屏区域配置。
- `navbar`: 可选对象 (Optional Object). 导航栏配置。
- `contents`: 内容对象数组 (Array of Content objects). 要显示的内容。
- `footer`: 可选对象 (Optional Object). 页脚配置。
- `ui`: 可选对象 (Optional Object). 界面翻译字符串。
  - `themeToggle`: 可选字符串 (Optional String). 主题切换器的提示文本。
  - `contact`: 可选字符串 (Optional String). 联系方式标签。

## 首屏区域 (`hero`)

顶部首屏区域的配置。

- `name`: 字符串 (String). 用户姓名。
- `welcome`: 字符串 (String). 欢迎语。
- `titles`: 字符串数组 (Array of strings). 在姓名下方通过打字机效果显示的动画头衔。
- `avatar`: URL 字符串. 头像图片。
- `bgImage`: URL 字符串. 顶部的全屏背景图片。
- `medias`: `HeroMedia` 数组. 社交媒体或联系方式链接。
  - `icon`: 图标名称 (例如 'mdi:github', 'github') 或图片 URL。
  - `name`: 显示名称。
  - `link`: URL。

## 导航栏 (`navbar`)

粘性导航栏配置。

- `links`: `NavLink` 数组.
  - `label`: 显示标签。
  - `anchor`: 目标内容块的 `id` (前缀为 `#`, 例如 `#profile`)。

## 内容块 (`contents`)

这是作品集的核心。它是一个组件配置数组。

每个对象遵循此通用结构：

```ts
{
  type: string;     // 组件标识符
  id: string;       // 唯一标识符 (用于导航)
  title: string;    // 章节标题
  icon?: string;    // 可选章节图标类名
  subtitle?: string;// 可选章节副标题
  data: any;        // 组件特定数据
  // 某些组件可能具有其他属性
}
```

## 支持的组件

### 1. 个人资料 (`profile`)

显示自定义字段、可点击的联系信息和可选标语。

- **数据结构** (`ProfileData`):
  - `fields`: `ProfileField` 数组.
    - `title`: 字符串 (String). 字段标题。
    - `icon`: 字符串 (String). 字段图标。
    - `value`: 字符串 (String, 支持 markdown) 或字符串数组。
  - `contact`: `ProfileContactItem` 数组.
    - `label`: 字符串 (String). 联系方式标签。
    - `value`: 字符串 (String). 联系方式值。
    - `link`: 可选 URL (Optional URL, 如果未提供，默认为 `mailto:value`)。
    - `icon`: 可选图标类名 (Optional icon class).
  - `slogan`: 可选字符串 (Optional String, 支持 markdown)。

### 2. 经历 (`experience`)

突出显示工作经历和学术背景的垂直时间轴。

- **数据结构**: `ExperienceItem` 数组:
  - `type`: 字符串 (String, 例如 `'study'`, `'work'`).
  - `place`: 字符串 (String). 地点/机构名称。
  - `title`: 可选字符串 (Optional String). 职位或学位。
  - `time`: 字符串 (String, 例如 '2021 - 2024').
  - `content`: 可选字符串 (Optional String, 支持 markdown). 主要内容。
  - `description`: 可选字符串 (Optional String, 支持 markdown). 额外详细信息。
  - `icon`: 可选图标名称 (Optional icon name).

### 3. 横幅 (`banner`)

具有高视觉冲击力的号召性用语块。

- **数据结构** (`BannerData`):
  - `content`: 字符串 (String, 支持 markdown). 主要内容文本。
  - `footer`: 可选字符串 (Optional String). 页脚文本。
  - `actions`: `BannerAction` 数组.
    - `label`: 字符串 (String). 按钮标签。
    - `link`: 字符串 (String). 按钮 URL。
    - `primary`: 可选布尔值 (Optional Boolean). 是否使用强调样式。

### 4. 时间轴 / 新闻 (`timeline`)

简洁、水平排列的事件或新闻更新列表。

- **数据结构**: `TimelineItem` 数组:
  - `year`: 字符串 (String). 年份或日期字符串。
  - `content`: 字符串 (String, 支持 markdown). 事件内容。
  - `link`: 可选 URL (Optional URL).
  - `linkText`: 可选链接标签 (Optional link label).

### 5. 卡片 (`cards`)

用于项目或论文的高级卡片网格。

- **数据结构**: `CardItem` 数组:
  - `title`: 字符串 (String). 卡片标题。
  - `category`: 可选字符串 (Optional String). 类别标签。
  - `link`: URL。
  - `description`: 可选字符串 (Optional String). 描述。
  - `action`: 可选字符串 (Optional String). 操作按钮标签。
  - `icon`: 可选字符串 (Optional String). 操作按钮图标。

### 6. 列表 (`list`)

用于出版物或奖项等列表的多功能组件。

- **额外配置**:
  - `unordered`: 可选布尔值 (Optional Boolean). 列表是无序 (ul) 还是有序 (ol)。
  - `dot`: 可选字符串 (Optional String). 无序列表的标记样式 (`'circle'`, `'square'`, `'diamond'`, `'check'`, `'none'`).
- **数据结构**: `ListItem` 或字符串数组:
  - 字符串：内容 (支持 markdown)。
  - `text`: 内容 (String, 支持 markdown).
  - `link`: 可选 URL (Optional URL).

### 7. 画廊 (`gallery`)

带有交互式灯箱的瀑布流照片墙。

- **数据结构**: `GalleryItem` 数组:
  - `url`: 图片 URL。
  - `title`: 图片标题。
  - `location`: 可选地点字符串 (Optional String).
  - `date`: 可选日期字符串 (Optional String).
  - `description`: 可选长篇故事 (Optional String, 支持 markdown)。

### 8. 段落 (`paragraph`)

渲染 Markdown 或 HTML 内容的简单文本块。非常适合结论、关于部分或自定义描述。

- **数据结构**: 字符串 (String, 支持 Markdown 或 HTML)。
- **card**: 布尔值 (Boolean, 默认 `false`). 是否以卡片样式显示（带有背景和边框）。

## 页脚 (`footer`)

页脚配置。

- `copyright`: 字符串 (String). 版权文本。
- `description`: 可选字符串 (Optional String). 页脚描述。

## 完整配置示例

以下是一个完整的配置示例 (基于 `src/helper.ts` 提供的辅助函数)：

```typescript
import {
  defineConfig,
  defineContents,
  defineFooterConfig,
  defineHeroConfig,
  defineNavbarConfig,
} from "./src/helper.js";

const hero = defineHeroConfig({
  name: "你的名字",
  welcome: "👋 你好，我是",
  titles: ["开发者", "设计师"],
  avatar: "/avatar.avif",
  bgImage: "https://example.com/bg.jpg",
  medias: [
    {
      icon: "mdi:github",
      name: "GitHub",
      link: "https://github.com/yourname",
    },
  ],
});

const navbar = defineNavbarConfig({
  links: [
    { label: "简介", anchor: "#profile" },
    { label: "经历", anchor: "#experience" },
  ],
});

const footer = defineFooterConfig({
  copyright: "© 2025 你的名字",
});

const contents = defineContents([
  {
    type: "profile",
    id: "profile",
    title: "个人简介",
    data: {
      fields: [{ title: "位置", icon: "map-marker", value: "中国" }],
      contact: [{ label: "Email", value: "email@example.com", icon: "email" }],
    },
  },
]);

export const zh = {
  langName: "简体中文",
  title: "我的作品集",
  hero,
  navbar,
  contents,
  footer,
};

export default defineConfig({
  locales: {
    "/": zh,
  },
});
```

## 自定义主题色

项目的主题色通过 CSS 变量定义，系统会自动根据基础色生成完整的色板。

你可以在 `src/index.css` 文件中修改以下变量来改变主题色：

```css
:root {
  /* 
    在此处定义你的品牌颜色。
    系统将根据这些颜色自动生成调色板。
  */
  --primary-base: #3b82f6; /* 主色调 (默认蓝色) */
  --secondary-base: #6366f1; /* 次要色调 (默认靛青色) */
}
```

修改后，Tailwind CSS 会自动生成对应的 `primary-50` 到 `primary-950` 以及 `secondary-50` 到 `secondary-950` 的色阶。
