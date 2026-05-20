export const toolItems = [
	{
		key: 'json',
		title: 'JSON 格式化 / 校验',
		shortTitle: 'JSON 格式化',
		desc: '格式化、压缩、校验、转义与去转义，支持 2/4/8 空格缩进。',
		path: '/tools/json',
		keywords: ['JSON 格式化', 'JSON 校验', 'JSON 压缩', 'JSON 转义'],
	},
	{
		key: 'base64',
		title: 'Base64 编解码 / 图片转 Base64',
		shortTitle: 'Base64 编解码',
		desc: '文本 Base64 编码解码，图片文件一键转 Base64 Data URL。',
		path: '/tools/base64',
		keywords: ['Base64 编码', 'Base64 解码', '图片转 Base64'],
	},
	{
		key: 'markdown',
		title: 'Markdown 在线预览',
		shortTitle: 'Markdown 预览',
		desc: '实时将 Markdown 渲染为 HTML 预览，适合快速检查文档排版。',
		path: '/tools/markdown',
		keywords: ['Markdown 预览', 'Markdown 转 HTML', '文档预览'],
	},
	{
		key: 'color',
		title: '颜色工具',
		shortTitle: '颜色工具',
		desc: '取色器、HEX/RGB/HSL 互转、调色板与 CSS 渐变色生成。',
		path: '/tools/color',
		keywords: ['颜色工具', '取色器', '调色板', '渐变色生成'],
	},
	{
		key: 'image',
		title: '图片压缩 / 格式转换',
		shortTitle: '图片压缩',
		desc: '浏览器本地压缩图片、调整尺寸、转换为 JPEG/PNG/WebP。',
		path: '/tools/image',
		keywords: ['图片压缩', '图片格式转换', 'WebP 转换'],
	},
	{
		key: 'text',
		title: '文本处理工具',
		shortTitle: '文本处理',
		desc: '大小写转换、HTML/URL 编解码、行排序去重、字符统计。',
		path: '/tools/text',
		keywords: ['文本处理', '大小写转换', 'URL 编码', 'HTML 转义'],
	},
] as const;

export type ToolKey = (typeof toolItems)[number]['key'];
