# haiminovo Agent Guide

## 项目定位

这是一个基于 `Next.js 14 App Router` 的个人博客站点，内容来源于 `content/` 下的 `MDX` 文件，使用 `contentlayer2` 在构建时生成文章数据，再通过静态导出部署。

站点特点：

- 纯静态导出：`next.config.mjs` 中开启了 `output: 'export'`
- 文章系统：`contentlayer2 + MDX + rehype/remark`
- 样式系统：`Tailwind CSS`
- 评论：`@giscus/react`
- 页面结构：左右侧栏 + 中间内容区

## 运行与构建

常用命令来自 [package.json](/Users/haimin/Documents/projects/haiminovo/package.json:1)：

- `pnpm dev`：启动 `contentlayer2 dev` 和 `next dev`
- `pnpm build`：先构建 contentlayer，再执行 `next build`
- `pnpm lint`：执行 `next lint`
- `pnpm prettier`：格式化整个仓库

仓库同时存在 `pnpm-lock.yaml` 和 `package-lock.json`。后续改动建议优先沿用 `pnpm`，除非项目维护者明确要求切到 `npm`。

## 目录速览

- `src/app/`：App Router 页面与全局布局
- `src/components/`：页面组件、MDX 渲染组件、客户端交互组件
- `src/utils/`：浏览器侧工具函数
- `content/post/`：博客文章 MDX
- `public/`：静态资源
- `contentlayer.config.js`：文章 schema 与 MDX 编译配置
- `tailwind.config.ts`：主题色与 Tailwind 配置

## 页面与数据流

### 1. 全局布局

[src/app/layout.tsx](/Users/haimin/Documents/projects/haiminovo/src/app/layout.tsx:1) 定义了全站骨架：

- 顶部导航 `Navbar`
- 左侧信息区：`MyInf`、`SiteInf`、移动端标签/目录
- 右侧辅助区：`Tags`、`PageNavigator`、`BackToTop`
- 底部 `Footer`

这是典型的博客壳层，新增页面时默认会继承这套布局。

### 2. 首页与文章列表

- [src/app/page.tsx](/Users/haimin/Documents/projects/haiminovo/src/app/page.tsx:1)：首页，包含 banner 和近期更新
- [src/app/post/page.tsx](/Users/haimin/Documents/projects/haiminovo/src/app/post/page.tsx:1)：文章列表页
- [src/components/postList/PostList.tsx](/Users/haimin/Documents/projects/haiminovo/src/components/postList/PostList.tsx:1)：从 `allPosts` 读取文章，可按 `tag` 查询参数过滤

### 3. 文章详情页

[src/app/post/[post]/page.tsx](/Users/haimin/Documents/projects/haiminovo/src/app/post/[post]/page.tsx:1) 使用 `allPosts` 生成静态路径并渲染文章内容：

- 通过 `slugAsParams` 匹配 URL
- 使用 `Mdx` 组件渲染 `page.body.code`
- 可选渲染文章头图

[src/app/post/[post]/layout.tsx](/Users/haimin/Documents/projects/haiminovo/src/app/post/[post]/layout.tsx:1) 为文章页补充版权说明和评论区。

## 内容系统

[contentlayer.config.js](/Users/haimin/Documents/projects/haiminovo/contentlayer.config.js:1) 是内容系统核心：

- 所有 `content/**/*.mdx` 会被识别为 `Post`
- 必填字段：`title`、`date`
- 常用字段：`description`、`tags`、`image`、`authors`
- 计算字段：
  - `slug`
  - `slugAsParams`

当前 MDX 能力包括：

- `remark-gfm`
- 标题 slug
- 代码高亮 `rehype-pretty-code`
- 标题锚点 `rehype-autolink-headings`

[src/components/mdx/mdx-components.tsx](/Users/haimin/Documents/projects/haiminovo/src/components/mdx/mdx-components.tsx:1) 注册了文章内可用组件与默认标签样式，包括：

- `Image`
- `Callout`
- `Card`
- 代码块复制按钮 `CopyButton`

如果要扩展文章语法或自定义短代码，优先改这里和 `contentlayer.config.js`。

## 样式与主题

- 全局样式在 [src/app/globals.css](/Users/haimin/Documents/projects/haiminovo/src/app/globals.css:1)
- Tailwind 主题在 [tailwind.config.ts](/Users/haimin/Documents/projects/haiminovo/tailwind.config.ts:1)

项目使用一组基于 `basicColor` 推导出来的浅色/深色主题色：

- `custom-color-1` ~ `custom-color-10`
- `custom-color-dark-1` ~ `custom-color-dark-10`

界面风格明显依赖这组颜色。新增组件时尽量沿用现有 token，而不是直接引入全新配色。

## 客户端交互点

以下组件依赖浏览器环境，修改时注意保留 `'use client'`：

- [src/components/postList/PostList.tsx](/Users/haimin/Documents/projects/haiminovo/src/components/postList/PostList.tsx:1)
- [src/components/comment/Comment.tsx](/Users/haimin/Documents/projects/haiminovo/src/components/comment/Comment.tsx:1)
- [src/components/tags/Tags.tsx](/Users/haimin/Documents/projects/haiminovo/src/components/tags/Tags.tsx:1)
- [src/components/pageNavigator/PageNavigator.tsx](/Users/haimin/Documents/projects/haiminovo/src/components/pageNavigator/PageNavigator.tsx:1)

其中：

- `Comment` 通过 `localStorage` 和自定义事件同步 giscus 主题
- `PageNavigator` 通过扫描文章 DOM 中带 `id` 的标题生成目录
- `Tags` 通过 `allPosts` 动态统计标签数量

## 静态导出约束

因为项目使用 `output: 'export'`，后续开发默认遵守这些边界：

- 不要依赖运行时服务端能力
- 不要引入需要 Node 常驻服务的 API 路由作为核心链路
- 动态页面必须能在构建期生成静态路径
- `next/image` 已配置为 `unoptimized`

如果要新增功能，优先选择“构建时生成 + 客户端增强”的方案。

## 修改建议

### 新增文章

1. 在 `content/post/` 下新增 `.mdx`
2. 补齐 frontmatter，至少包含 `title` 和 `date`
3. 如果需要目录效果，正文中使用标准标题标签
4. 本地运行 `pnpm dev` 或 `pnpm build`，确认 contentlayer 编译通过

### 新增页面

1. 优先放在 `src/app/` 下
2. 默认复用全局布局
3. 如果页面需要客户端逻辑，再拆成 client component

### 新增 MDX 组件

1. 组件实现在 `src/components/mdx/` 或合适的公共组件目录
2. 在 `mdx-components.tsx` 注册
3. 如涉及编译能力变化，再同步修改 `contentlayer.config.js`

## 已观察到的注意点

- 文章详情页当前直接修改导出的 `metadata` 对象；如果后续要完善 SEO，建议改成 `generateMetadata`
- [src/app/sitemap.ts](/Users/haimin/Documents/projects/haiminovo/src/app/sitemap.ts:1) 目前是手写静态列表，不会随新增文章自动更新
- 仓库里当前没有成体系的测试配置，改动后至少应跑 `pnpm lint`，必要时补一次 `pnpm build`
- 当前工作区存在未提交变更：`.github/workflows/main.yml` 被删除；处理其他任务时不要误恢复

## 推荐的 agent 工作方式

在这个仓库里工作时，优先按下面的顺序理解和落地：

1. 先看 `src/app` 对应页面入口
2. 再看关联 `components`
3. 涉及文章内容时看 `contentlayer.config.js` 和 `content/post`
4. 涉及样式时优先复用现有 Tailwind class 和主题色 token
5. 提交前至少做一轮 `lint`，涉及路由或内容系统时再跑 `build`

## 一句话总结

这是一个以 `MDX 内容发布` 为核心、以 `静态导出` 为部署前提的个人博客项目。任何改动都应优先保证：构建期可生成、样式与现有主题一致、文章链路不被破坏。
