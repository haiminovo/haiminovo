import ImageTool from '@/components/tools/ImageTool';
import ToolPageLayout from '../ToolPageLayout';

export const metadata = {
  title: '图片压缩 / 格式转换 | 巅峰之路',
  description: '免费的在线图片压缩与格式转换工具，支持 JPEG/PNG/WebP 互转、调整尺寸与质量，浏览器本地处理，不上传服务器。',
};

export default function ImagePage() {
  return (
    <ToolPageLayout
      title="图片压缩 / 格式转换"
      description="在浏览器本地压缩图片、调整尺寸并转换格式，不上传服务器"
      activeKey="image"
    >
      <ImageTool />
    </ToolPageLayout>
  );
}
