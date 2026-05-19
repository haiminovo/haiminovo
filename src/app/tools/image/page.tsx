import ImageTool from '@/components/tools/ImageTool';
import ToolPageLayout from '../ToolPageLayout';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: '图片压缩 / 格式转换',
  description: '免费的在线图片压缩与格式转换工具，支持 JPEG/PNG/WebP 互转、调整尺寸与质量。',
  path: '/tools/image',
  keywords: ['图片压缩', '图片格式转换', 'JPEG 转 WebP', '在线工具'],
});

export default function ImagePage() {
  return (
    <ToolPageLayout
      title="图片压缩 / 格式转换"
      description="在浏览器本地压缩图片、调整尺寸并转换格式"
      activeKey="image"
    >
      <ImageTool />
    </ToolPageLayout>
  );
}
