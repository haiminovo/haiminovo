import Link from 'next/link';
import { createMetadata } from '@/lib/seo';
import {
  ClusterOutlined,
  FileTextOutlined,
  BgColorsOutlined,
  PictureOutlined,
  FontSizeOutlined,
  CodeOutlined,
} from '@ant-design/icons';

export const metadata = createMetadata({
  title: '实用工具',
  description:
    'roadto.top 实用工具箱 — JSON 格式化、Base64 编解码、Markdown 预览、颜色工具、图片压缩、文本处理等在线小工具。',
  path: '/tools',
  keywords: ['在线工具', 'JSON 格式化', 'Base64', 'Markdown 预览', '颜色工具', '图片压缩', '文本处理'],
});

const tools = [
  {
    key: 'json',
    title: 'JSON 格式化 / 校验',
    desc: 'JSON 格式化、压缩、校验、转义与去转义，支持缩进调节',
    icon: <ClusterOutlined />,
    path: '/tools/json',
  },
  {
    key: 'base64',
    title: 'Base64 编解码 / 图片转 Base64',
    desc: '文本 Base64 编码解码，图片文件一键转 Base64 Data URL',
    icon: <CodeOutlined />,
    path: '/tools/base64',
  },
  {
    key: 'markdown',
    title: 'Markdown 在线预览',
    desc: '实时将 Markdown 渲染为 HTML 预览，支持复制 HTML',
    icon: <FileTextOutlined />,
    path: '/tools/markdown',
  },
  {
    key: 'color',
    title: '颜色工具',
    desc: '取色器、HEX/RGB/HSL 互转、调色板与渐变色生成',
    icon: <BgColorsOutlined />,
    path: '/tools/color',
  },
  {
    key: 'image',
    title: '图片压缩 / 格式转换',
    desc: '浏览器本地压缩图片、调整尺寸、转换为 JPEG/PNG/WebP',
    icon: <PictureOutlined />,
    path: '/tools/image',
  },
  {
    key: 'text',
    title: '文本处理工具',
    desc: '大小写转换、格式化、HTML/URL 编解码、行处理、字符统计',
    icon: <FontSizeOutlined />,
    path: '/tools/text',
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="flex h-full flex-col items-center p-6 max-md:p-4">
      <div className="mb-6 flex w-full flex-col gap-2">
        <h1 className="text-3xl font-black">实用工具</h1>
        <p className="text-sm leading-7 opacity-80">
          一些常用的在线小工具。
        </p>
      </div>

      <ul className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {tools.map((tool) => (
          <li key={tool.key}>
            <Link
              href={tool.path}
              className="group flex flex-col gap-2 rounded-xl border border-slate-200/50 bg-custom-color-10/80 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300/60 hover:bg-white/80 hover:shadow-md dark:border-slate-600/30 dark:bg-custom-color-dark-7/80 dark:hover:border-slate-500/50 dark:hover:bg-slate-700/80"
            >
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-custom-color-8 text-font-normal transition-colors group-hover:bg-custom-color-7 dark:bg-custom-color-dark-8 dark:text-font-light-dark dark:group-hover:bg-custom-color-dark-7">
                  <span className="text-sm">{tool.icon}</span>
                </span>
                <h2 className="text-base font-bold text-font-strong dark:text-font-light-dark">
                  {tool.title}
                </h2>
              </div>
              <p className="text-xs leading-relaxed text-font-light dark:text-font-normal-dark">
                {tool.desc}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
