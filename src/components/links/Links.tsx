import Link from 'next/link';
import { FileTextOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';

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
	];

export default function Links(props: IProps) {
	return (
		<div className="flex items-center gap-1 px-1 text-nowrap" {...props}>
			{links.map((item) => (
				<Link
					key={item.title}
					href={item.path}
					className="group/nav relative flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-normal leading-none text-font-normal transition-colors duration-300 hover:text-font-strong dark:text-font-normal-dark dark:hover:text-font-light-dark max-lg:px-1.5 max-lg:text-[13px] max-md:px-1"
				>
					<span className="relative flex items-center">
						<span className="flex items-center text-xs transition-transform duration-300 group-hover/nav:scale-110">
							{item.icon}
						</span>
					</span>
					<span className="relative">
						{item.title}
						<span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-font-normal transition-all duration-300 group-hover/nav:w-full dark:bg-font-light-dark" />
					</span>
				</Link>
			))}
		</div>
	);
}
