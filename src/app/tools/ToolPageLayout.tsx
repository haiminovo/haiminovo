import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  ClusterOutlined,
  FileTextOutlined,
  BgColorsOutlined,
  PictureOutlined,
  FontSizeOutlined,
  CodeOutlined,
} from '@ant-design/icons';

const toolLinks = [
  { key: 'json', title: 'JSON 格式化', path: '/tools/json', icon: <ClusterOutlined /> },
  { key: 'base64', title: 'Base64 编解码', path: '/tools/base64', icon: <CodeOutlined /> },
  { key: 'markdown', title: 'Markdown 预览', path: '/tools/markdown', icon: <FileTextOutlined /> },
  { key: 'color', title: '颜色工具', path: '/tools/color', icon: <BgColorsOutlined /> },
  { key: 'image', title: '图片压缩', path: '/tools/image', icon: <PictureOutlined /> },
  { key: 'text', title: '文本处理', path: '/tools/text', icon: <FontSizeOutlined /> },
];

interface ToolPageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  activeKey?: string;
}

export default function ToolPageLayout({ title, description, children, activeKey }: ToolPageLayoutProps) {
  return (
    <div className="flex h-full flex-col items-center p-6 max-md:p-4">
      <div className="mb-4 flex w-full flex-col gap-2">
        <h1 className="text-3xl font-black">{title}</h1>
        {description && (
          <p className="text-sm leading-7 opacity-80">{description}</p>
        )}
      </div>

      {/* Sub-nav */}
      <div className="mb-6 flex w-full flex-wrap gap-2">
        {toolLinks.map((tool) => {
          const isActive = activeKey ? tool.key === activeKey : false;
          return (
            <Link
              key={tool.key}
              href={tool.path}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                isActive
                  ? 'bg-custom-color-10 text-font-strong shadow-sm dark:bg-custom-color-dark-6 dark:text-font-light-dark'
                  : 'text-font-light hover:bg-custom-color-9 hover:text-font-normal dark:text-font-normal-dark dark:hover:bg-custom-color-dark-8 dark:hover:text-font-light-dark'
              }`}
            >
              <span className="text-xs">{tool.icon}</span>
              <span>{tool.title}</span>
            </Link>
          );
        })}
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
}
