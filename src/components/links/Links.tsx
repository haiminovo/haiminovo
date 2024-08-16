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
        <div className="flex items-center text-nowrap" {...props}>
            {links.map((item) => (
                <Link
                    key={item.title}
                    href={item.path}
                    className="flex items-center gap-1 rounded-lg p-2 font-normal hover:bg-custom-color-5 hover:shadow-md dark:hover:bg-custom-color-dark-2"
                >
                    <div className="text-xs">{item.icon}</div>
                    <div className="text-sm">{item.title}</div>
                </Link>
            ))}
        </div>
    );
}
