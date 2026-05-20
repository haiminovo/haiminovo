import type { ReactNode } from 'react';
import Link from 'next/link';
import { tools } from '@/lib/tools';

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

      <nav aria-label="工具导航" className="mb-6 flex w-full gap-2 overflow-x-auto pb-1 max-md:-mx-4 max-md:w-[calc(100%+2rem)] max-md:px-4">
        <Link
          href="/tools"
          className="flex shrink-0 items-center rounded-md px-3 py-2 text-sm font-medium text-font-light transition-colors hover:bg-custom-color-9 hover:text-font-normal dark:text-font-normal-dark dark:hover:bg-custom-color-dark-8 dark:hover:text-font-light-dark"
        >
          全部工具
        </Link>
        {tools.map((tool) => {
          const isActive = activeKey ? tool.key === activeKey : false;
          return (
            <Link
              key={tool.key}
              href={tool.path}
              aria-current={isActive ? 'page' : undefined}
              className={`flex shrink-0 items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-custom-color-10 text-font-strong shadow-sm dark:bg-custom-color-dark-6 dark:text-font-light-dark'
                  : 'text-font-light hover:bg-custom-color-9 hover:text-font-normal dark:text-font-normal-dark dark:hover:bg-custom-color-dark-8 dark:hover:text-font-light-dark'
              }`}
            >
              <span className="text-xs">{tool.icon}</span>
              <span>{tool.shortTitle}</span>
            </Link>
          );
        })}
      </nav>

      <div className="w-full">{children}</div>
    </div>
  );
}
