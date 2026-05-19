import type { ReactNode } from 'react';

interface ToolPanelProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function ToolPanel({ title, description, children }: ToolPanelProps) {
  return (
    <div className="bg-custom-color-10/80 dark:bg-custom-color-dark-7/80 w-full rounded-xl border border-slate-200/50 p-6 shadow-sm transition-all dark:border-slate-600/30 max-md:p-4">
      <div className="mb-4 flex flex-col gap-1">
        <h2 className="text-lg font-bold text-font-strong dark:text-font-light-dark">
          {title}
        </h2>
        {description && (
          <p className="text-xs text-font-light dark:text-font-normal-dark">
            {description}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}
