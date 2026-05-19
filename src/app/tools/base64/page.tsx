import Base64Tool from '@/components/tools/Base64Tool';
import ToolPageLayout from '../ToolPageLayout';

export const metadata = {
  title: 'Base64 编解码 / 图片转 Base64 | 巅峰之路',
  description: '免费的 Base64 在线编码解码工具，支持文本 Base64 转换和图片文件转 Base64 Data URL，纯本地处理。',
};

export default function Base64Page() {
  return (
    <ToolPageLayout
      title="Base64 编解码 / 图片转 Base64"
      description="支持文本 Base64 编解码，以及图片文件转 Base64 Data URL，纯本地处理"
      activeKey="base64"
    >
      <Base64Tool />
    </ToolPageLayout>
  );
}
