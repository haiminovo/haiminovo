import JsonTool from '@/components/tools/JsonTool';
import ToolPageLayout from '../ToolPageLayout';
import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
  title: 'JSON 格式化 / 校验',
  description: '免费的 JSON 在线格式化、压缩、校验、转义工具。支持缩进调节，纯本地处理，数据安全。',
  path: '/tools/json',
  keywords: ['JSON 格式化', 'JSON 校验', 'JSON 压缩', 'JSON 转义', '在线工具'],
});

export default function JsonPage() {
  return (
    <ToolPageLayout
      title="JSON 格式化 / 校验"
      description="支持格式化、压缩、校验、转义与去转义，纯本地处理"
      activeKey="json"
    >
      <JsonTool />
    </ToolPageLayout>
  );
}
