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
		<div className="flex h-full flex-wrap items-center gap-1 px-1 text-nowrap" {...props}>
			{links.map((item) => (
				<Link
					key={item.title}
					href={item.path}
					className="hover:bg-custom-color-5/30 dark:hover:bg-custom-color-dark-2/30 flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-normal hover:shadow-md max-lg:px-1.5 max-lg:text-[13px] max-md:px-1"
				>
					<div className="text-xs">{item.icon}</div>
					<div>{item.title}</div>
				</Link>
			))}
		</div>
	);
}
