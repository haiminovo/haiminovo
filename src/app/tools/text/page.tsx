import TextTool from '@/components/tools/TextTool';
import ToolPageLayout from '../ToolPageLayout';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: '文本处理工具',
  description: '免费的在线文本处理工具箱，支持大小写转换、格式化、HTML/URL 编解码、行处理、字符统计等。',
  path: '/tools/text',
  keywords: ['文本处理', '大小写转换', 'URL 编码', 'HTML 转义', '在线工具'],
});

export default function TextPage() {
  return (
    <ToolPageLayout
      title="文本处理工具"
      description="大小写转换、格式化、编码解码、行处理等多种文本操作"
      activeKey="text"
    >
      <TextTool />
    </ToolPageLayout>
  );
}
