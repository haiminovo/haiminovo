import MarkdownTool from '@/components/tools/MarkdownTool';
import ToolPageLayout from '../ToolPageLayout';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'Markdown 在线预览',
  description: '免费的 Markdown 在线预览工具，实时渲染为 HTML，支持常见语法，可复制 HTML 代码。',
  path: '/tools/markdown',
  keywords: ['Markdown 预览', 'Markdown 转 HTML', '在线工具'],
});

export default function MarkdownPage() {
  return (
    <ToolPageLayout
      title="Markdown 在线预览"
      description="实时渲染 Markdown 为 HTML，支持常见语法"
      activeKey="markdown"
    >
      <MarkdownTool />
    </ToolPageLayout>
  );
}
