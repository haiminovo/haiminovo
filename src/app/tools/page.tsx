import Link from 'next/link';
import { createMetadata } from '@/lib/seo';
import JsonLd from '@/components/seo/JsonLd';
import { siteConfig } from '@/lib/seo';
import { tools } from '@/lib/tools';
import { toolItems } from '@/lib/tools-data';

export const metadata = createMetadata({
  title: '实用工具',
  description:
    'roadto.top 实用工具箱 — JSON 格式化、Base64 编解码、Markdown 预览、颜色工具、图片压缩、文本处理等在线小工具。',
  path: '/tools',
  keywords: ['在线工具', 'JSON 格式化', 'Base64', 'Markdown 预览', '颜色工具', '图片压缩', '文本处理'],
});

export default function ToolsIndexPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: '实用工具',
      description:
        'roadto.top 实用工具箱，提供 JSON 格式化、Base64 编解码、Markdown 预览、颜色工具、图片压缩、文本处理等在线小工具。',
      url: `${siteConfig.url}/tools/`,
      hasPart: toolItems.map((tool) => ({
        '@type': 'WebApplication',
        name: tool.title,
        url: `${siteConfig.url}${tool.path}/`,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        description: tool.desc,
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: siteConfig.name,
          item: siteConfig.url,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '实用工具',
          item: `${siteConfig.url}/tools/`,
        },
      ],
    },
  ];

  return (
    <div className="flex h-full flex-col items-center p-6 max-md:p-4">
      <JsonLd data={jsonLd} />
      <div className="mb-6 flex w-full flex-col gap-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex max-w-3xl flex-col gap-2">
            <h1 className="text-3xl font-black text-font-strong dark:text-font-light-dark">
              实用工具
            </h1>
            <p className="text-sm leading-7 text-font-light dark:text-font-normal-dark">
              面向日常开发与内容处理的在线工具箱：JSON、Base64、Markdown、颜色、图片和文本处理都在浏览器本地完成，打开即用。
            </p>
          </div>
          <span className="rounded-md border border-slate-200/60 bg-white/60 px-3 py-1.5 text-xs text-font-light dark:border-slate-600/40 dark:bg-slate-800/60 dark:text-font-normal-dark">
            本地处理，不上传文件
          </span>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-font-light dark:text-font-normal-dark">
          <span className="rounded-md bg-custom-color-9 px-2.5 py-1 dark:bg-custom-color-dark-8">开发调试</span>
          <span className="rounded-md bg-custom-color-9 px-2.5 py-1 dark:bg-custom-color-dark-8">内容整理</span>
          <span className="rounded-md bg-custom-color-9 px-2.5 py-1 dark:bg-custom-color-dark-8">图片压缩</span>
          <span className="rounded-md bg-custom-color-9 px-2.5 py-1 dark:bg-custom-color-dark-8">颜色生成</span>
        </div>
      </div>

      <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <li key={tool.key}>
            <Link
              href={tool.path}
              className="group flex min-h-40 flex-col gap-3 rounded-lg border border-slate-200/50 bg-custom-color-10/80 p-5 shadow-sm transition-colors duration-200 hover:border-slate-300/70 hover:bg-white/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 dark:border-slate-600/30 dark:bg-custom-color-dark-7/80 dark:hover:border-slate-500/50 dark:hover:bg-slate-700/80"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-custom-color-8 text-font-normal transition-colors group-hover:bg-custom-color-7 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:group-hover:bg-custom-color-dark-7">
                  <span className="text-sm">{tool.icon}</span>
                </span>
                <h2 className="text-base font-bold text-font-strong dark:text-font-light-dark">
                  {tool.title}
                </h2>
              </div>
              <p className="text-xs leading-relaxed text-font-light dark:text-font-normal-dark">
                {tool.desc}
              </p>
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {tool.keywords.slice(0, 3).map((keyword) => (
                  <span
                    key={keyword}
                    className="rounded bg-white/55 px-2 py-1 text-[11px] text-font-light dark:bg-slate-800/60 dark:text-font-normal-dark"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
