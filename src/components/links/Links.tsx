'use client';
import Link from 'next/link';
import { FileTextOutlined, HomeOutlined, TeamOutlined, ToolOutlined } from '@ant-design/icons';

interface IProps {
	className?: string;
}

export const links: {
	title: string;
	path: string;
	icon?: any;
}[] = [
		{
			title: '首页',
			path: '/',
			icon: <HomeOutlined />,
		},
		{
			title: '文章',
			path: '/post',
			icon: <FileTextOutlined />,
		},
		{
			title: '友链',
			path: '/friendlyLink',
			icon: <TeamOutlined />,
		},
		{
			title: '测试',
			path: '/test',
			icon: <ToolOutlined />,
		},
	];

export default function Links(props: IProps) {
	return (
		<div className="flex h-full items-center gap-4 text-nowrap px-3" {...props}>
			{links.map((item) => (
				<Link
					onClick={() => setTimeout(() => scroll(0, 0), 0)}
					key={item.title}
					href={item.path}
					className="flex items-center gap-1 rounded-lg px-2 py-1 font-normal hover:bg-custom-color-5/30 hover:shadow-md dark:hover:bg-custom-color-dark-2/30"
				>
					<div className="text-xs">{item.icon}</div>
					<div className="text-sm">{item.title}</div>
				</Link>
			))}
		</div>
	);
}
