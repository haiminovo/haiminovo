import JsonTool from '@/components/tools/JsonTool';
import ToolPageLayout from '../ToolPageLayout';

export const metadata = {
  title: 'JSON 格式化 / 校验 | 巅峰之路',
  description: '免费的 JSON 在线格式化、压缩、校验、转义工具。支持缩进调节，纯本地处理，数据安全。',
};

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
