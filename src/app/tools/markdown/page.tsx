import MarkdownTool from '@/components/tools/MarkdownTool';
import ToolPageLayout from '../ToolPageLayout';

export const metadata = {
  title: 'Markdown 在线预览 | 巅峰之路',
  description: '免费的 Markdown 在线预览工具，实时渲染为 HTML，支持常见语法，可复制 HTML 代码，纯本地处理。',
};

export default function MarkdownPage() {
  return (
    <ToolPageLayout
      title="Markdown 在线预览"
      description="实时渲染 Markdown 为 HTML，支持常见语法，纯本地处理"
      activeKey="markdown"
    >
      <MarkdownTool />
    </ToolPageLayout>
  );
}
