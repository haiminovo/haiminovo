import Link from 'next/link';
import {
    DashboardOutlined,
    FileTextOutlined,
    HomeOutlined,
    QuestionCircleOutlined,
    TeamOutlined,
    UsergroupAddOutlined,
} from '@ant-design/icons';

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
        path: '/dashboard',
        icon: <TeamOutlined />,
    },
    {
        title: '关于',
        path: '/dashboard',
        icon: <QuestionCircleOutlined />,
    },
];

export default function Links(props: IProps) {
    const { className } = props;

    return (
        <div className={`flex w-full gap-3 ${className}`}>
            {links.map((item) => (
                <Link
                    key={item.title}
                    href={item.path}
                    className="flex items-center p-2 rounded-lg gap-3 font-normal hover:shadow-md hover:bg-custom-color-2 dark:hover:bg-custom-color-dark-2"
                >
                    <div>{item.icon}</div>
                    <p>{item.title}</p>
                </Link>
            ))}
        </div>
    );
}
