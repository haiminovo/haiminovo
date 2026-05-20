import {
	BgColorsOutlined,
	ClusterOutlined,
	CodeOutlined,
	FileTextOutlined,
	FontSizeOutlined,
	PictureOutlined,
} from '@ant-design/icons';
import type { ReactNode } from 'react';
import { toolItems, type ToolKey } from './tools-data';

const toolIcons: Record<ToolKey, ReactNode> = {
	json: <ClusterOutlined />,
	base64: <CodeOutlined />,
	markdown: <FileTextOutlined />,
	color: <BgColorsOutlined />,
	image: <PictureOutlined />,
	text: <FontSizeOutlined />,
};

export const tools = toolItems.map((tool) => ({
	...tool,
	icon: toolIcons[tool.key],
}));
