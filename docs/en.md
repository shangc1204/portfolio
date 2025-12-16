# Global Configuration Guide

The application is controlled by a single configuration object.

## 🚀 Quick Start

1.  Copy an example config from `examples/` to the root directory (e.g., `cp examples/config.example.yml config.yml`).
2.  Edit `config.yml` to customize your portfolio.

Supported configuration formats: `config.ts`, `config.js`, `config.json`, `config.yml`, `config.yaml`.

## Configuration Structure (`Config`)

The configuration file exports a `Config` object by default, containing the following fields:

- `locales`: Object. Multi-language configuration map. Keys are path prefixes (e.g., `"/"`, `"/zh/"`), and values are `LocaleConfig` objects.
- `experienceStyles`: Optional Object. Custom styles map for the experience component.

## Locale Configuration (`LocaleConfig`)

In the `locales` object, each language configuration contains the following fields:

- `langName`: String. Language name (e.g., "English", "简体中文").
- `title`: String. Website title.
- `description`: String. Website description.
- `hero`: Object. Hero section configuration.
- `navbar`: Optional Object. Navbar configuration.
- `contents`: Array of `Content` objects. Content to display.
- `footer`: Optional Object. Footer configuration.
- `ui`: Optional Object. UI translation strings.
  - `themeToggle`: Optional String. Tooltip text for theme toggler.
  - `contact`: Optional String. Label for contact.

## Hero Section (`hero`)

Configuration for the top hero section.

- `name`: String. User name.
- `welcome`: String. Welcome message.
- `titles`: Array of strings. Animated titles shown under the name using a typewriter effect.
- `avatar`: URL String. Profile picture.
- `bgImage`: URL String. Full-screen background image for the header.
- `medias`: Array of `HeroMedia`. Social media or contact links.
  - `icon`: Icon name (e.g., 'mdi:github', 'github') or image URL.
  - `name`: Display name.
  - `link`: URL.

## Navigation Bar (`navbar`)

The sticky navbar configuration.

- `links`: Array of `NavLink`.
  - `label`: Display label.
  - `anchor`: The `id` of the target content block (prefixed with `#`, e.g., `#profile`).

## Content Blocks (`contents`)

This is the core of the portfolio. It is an array of component configurations.

Each object follows this general structure:

```ts
{
  type: string;     // The component identifier
  id: string;       // Unique identifier (used for navigation)
  title: string;    // Section heading
  icon?: string;    // Optional section icon class
  subtitle?: string;// Optional section subtitle
  data: any;        // Component-specific data
  // Some components may have additional properties
}
```

## Supported Components

### 1. Profile (`profile`)

Displays custom fields, clickable contact info, and an optional slogan.

- **Data Schema** (`ProfileData`):
  - `fields`: Array of `ProfileField`.
    - `title`: String. Field title.
    - `icon`: String. Field icon.
    - `value`: String (markdown supported) or Array of strings.
  - `contact`: Array of `ProfileContactItem`.
    - `label`: String. Contact label.
    - `value`: String. Contact value.
    - `link`: Optional URL (defaults to `mailto:value` if not provided).
    - `icon`: Optional icon class.
  - `slogan`: Optional String (markdown supported).

### 2. Experience (`experience`)

A vertical timeline highlighting work history and academic background.

- **Data Schema**: Array of `ExperienceItem`:
  - `type`: String (e.g., `'study'`, `'work'`).
  - `place`: String. Place/Institution name.
  - `title`: Optional String. Job title or Degree.
  - `time`: String (e.g., '2021 - 2024').
  - `content`: Optional String (markdown supported). Main content.
  - `description`: Optional String (markdown supported). Additional details.
  - `icon`: Optional icon name.

### 3. Banner (`banner`)

A call-to-action block with high visual impact.

- **Data Schema** (`BannerData`):
  - `content`: String (markdown supported). Main content text.
  - `footer`: Optional String. Footer text.
  - `actions`: Array of `BannerAction`.
    - `label`: String. Button label.
    - `link`: String. Button URL.
    - `primary`: Optional Boolean. Whether to use emphasized style.

### 4. Timeline / News (`timeline`)

A clean, horizontally-aligned list of events or news updates.

- **Data Schema**: Array of `TimelineItem`:
  - `year`: String. Year or date string.
  - `content`: String (markdown supported). Event content.
  - `link`: Optional URL.
  - `linkText`: Optional label for the link.

### 5. Cards (`cards`)

A grid of high-level cards for projects or dissertations.

- **Data Schema**: Array of `CardItem`:
  - `title`: String. Card title.
  - `category`: Optional String. Category label.
  - `link`: URL.
  - `description`: Optional String.
  - `action`: Optional String. Action button label.
  - `icon`: Optional String. Action button icon.

### 6. List (`list`)

A versatile component for lists like Publications or Awards.

- **Additional Config**:
  - `unordered`: Optional Boolean. Whether the list is unordered (ul) or ordered (ol).
  - `dot`: Optional String. Marker style for unordered lists (`'circle'`, `'square'`, `'diamond'`, `'check'`, `'none'`).
- **Data Schema**: Array of `ListItem` or String:
  - String: Content (markdown supported).
  - `text`: Content (markdown supported).
  - `link`: Optional URL.

### 7. Gallery (`gallery`)

A masonry-style photo wall with an interactive lightbox.

- **Data Schema**: Array of `GalleryItem`:
  - `url`: Image URL.
  - `title`: Image title.
  - `location`: Optional location string.
  - `date`: Optional date string.
  - `description`: Optional long-form story (markdown supported).

### 8. Paragraph (`paragraph`)

A simple text block that renders Markdown or HTML content. Ideal for conclusions, about sections, or custom descriptions.

- **Data Schema**: String (Markdown or HTML supported).
- **card**: Boolean (default `false`). Whether to display as a card (with background and border).

## Footer (`footer`)

Configuration for the footer.

- `copyright`: String. Copyright text.
- `description`: Optional String. Footer description.

## Complete Configuration Example

Here is a complete configuration example (using helper functions from `src/helper.ts`):

```typescript
import {
  defineConfig,
  defineContents,
  defineFooterConfig,
  defineHeroConfig,
  defineNavbarConfig,
} from "./src/helper.js";

const hero = defineHeroConfig({
  name: "Your Name",
  welcome: "👋 Hi, I am",
  titles: ["Developer", "Designer"],
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
    { label: "Profile", anchor: "#profile" },
    { label: "Experience", anchor: "#experience" },
  ],
});

const footer = defineFooterConfig({
  copyright: "© 2025 Your Name",
});

const contents = defineContents([
  {
    type: "profile",
    id: "profile",
    title: "Profile",
    data: {
      fields: [{ title: "Location", icon: "map-marker", value: "USA" }],
      contact: [{ label: "Email", value: "email@example.com", icon: "email" }],
    },
  },
]);

export const en = {
  langName: "English",
  title: "My Portfolio",
  hero,
  navbar,
  contents,
  footer,
};

export default defineConfig({
  locales: {
    "/": en,
  },
});
```

## Customizing Theme Colors

The project's theme colors are defined via CSS variables, and the system automatically generates a complete color palette based on the base colors.

You can modify the following variables in `src/index.css` to change the theme colors:

```css
:root {
  /* 
    Define your brand colors here. 
    The system will automatically generate the palette based on these colors.
  */
  --primary-base: #3b82f6; /* Primary color (Default Blue) */
  --secondary-base: #6366f1; /* Secondary color (Default Indigo) */
}
```

After modification, Tailwind CSS will automatically generate the corresponding color scales from `primary-50` to `primary-950` and `secondary-50` to `secondary-950`.
