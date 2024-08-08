import Link from 'next/link';
import { DashboardOutlined, FileTextOutlined, HomeOutlined, TeamOutlined } from '@ant-design/icons';

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
        title: '面板',
        path: '/dashboard',
        icon: <DashboardOutlined />,
    },
    {
        title: '友链',
        path: '/friendLink',
        icon: <TeamOutlined />,
    },
];

export default function Links(props: IProps) {
    return (
        <div className="flex items-center" {...props}>
            {links.map((item) => (
                <Link
                    key={item.title}
                    href={item.path}
                    className="flex items-center p-2 rounded-lg gap-1 font-normal 
                        hover:shadow-md hover:bg-custom-color-5 dark:hover:bg-custom-color-dark-2"
                >
                    <div className="text-xs">{item.icon}</div>
                    <div className="text-sm">{item.title}</div>
                </Link>
            ))}
        </div>
    );
}
