# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Quick reference

- `pnpm dev` — start dev server (contentlayer2 dev + next dev --webpack)
- `pnpm build` — production build (contentlayer2 build + next build --webpack)
- `pnpm lint` — ESLint
- `pnpm prettier` — format all files

## Architecture

Personal blog (roadto.top) built with **Next.js 16 App Router** + **static export** (`output: 'export'`). Content lives in `content/post/*.mdx`, processed by **contentlayer2** at build time into `.contentlayer/generated/`. No runtime server — everything must work at build time or in the browser.

### Key constraints from static export

- No API routes, no middleware, no SSR
- Dynamic routes must be known at build time (contentlayer `allPosts` drives `generateStaticParams`)
- `next/image` is `unoptimized`

### Data flow

1. MDX files in `content/post/` → contentlayer2 compiles to typed data (both contentlayer.config.js and `.contentlayer/generated/`)
2. Pages import `allPosts` from `contentlayer/generated` for post lists, tag aggregation, and slug routing
3. MDX body rendered via `<Mdx code={post.body.code} />` with custom components registered in `src/components/mdx/mdx-components.tsx`

### Page structure (three-column blog shell)

All pages inherit from `src/app/layout.tsx`:
- **Left `<Aside>`** (hidden on `<lg`): `MyInf`, `SiteInf`, plus hidden `Tags`/`PageNavigator`
- **Center**: page content
- **Right `<Aside>`** (hidden on `<xl`): `Tags`, `PageNavigator`, `BackToTop`

### Tools section (`src/app/tools/`)

Six client-side tools, each a separate route with its own page (e.g., `/tools/json/`, `/tools/base64/`). All processing happens in the browser. Tool definitions live in `src/lib/tools-data.ts`. Each tool uses `ToolPageLayout` for consistent navigation. Adding a new tool requires: new page route, a `<XxxTool>` component in `src/components/tools/`, and an entry in `tools-data.ts`.

### Theme / Styling

**Tailwind CSS v4** via `@tailwindcss/postcss`. Custom color palette generated programmatically in `tailwind.config.mjs` from a single `basicColor` (`#e2e5e8`), producing 10 light shades (`custom-color-1` through `custom-color-10`) and 10 dark shades (`custom-color-dark-1` through `custom-color-dark-10`).

### SEO

Centralized in `src/lib/seo.ts` — `siteConfig` holds site metadata, `createMetadata()` builds per-page `Metadata` objects with Open Graph, Twitter cards, canonical URLs, and keywords. Use `createMetadata()` instead of raw `metadata` exports for consistency.

### MDX plugins

- `remark-gfm` (tables, strikethrough, task lists)
- `rehype-slug` + `rehype-autolink-headings` (heading anchors)
- `rehype-pretty-code` (code highlighting, theme: `github-dark`)

### Package manager

**pnpm** (preferred, per `pnpm-lock.yaml`).

### Lint-staged

On commit: ESLint runs on `*.js`, Prettier runs on `*.{js,ts,tsx,css,md}`.
