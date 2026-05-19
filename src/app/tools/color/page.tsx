import ColorTool from '@/components/tools/ColorTool';
import ToolPageLayout from '../ToolPageLayout';

export const metadata = {
  title: '颜色工具 - 取色 / 调色 / 渐变生成 | 巅峰之路',
  description: '免费的在线颜色工具，支持取色器、HEX/RGB/HSL 互转、调色板生成、渐变色生成与 CSS 代码复制，纯本地处理。',
};

export default function ColorPage() {
  return (
    <ToolPageLayout
      title="颜色工具"
      description="取色、调色板生成与渐变色生成，纯本地处理"
      activeKey="color"
    >
      <ColorTool />
    </ToolPageLayout>
  );
}
