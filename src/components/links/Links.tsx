import Link from 'next/link';
import { HomeOutlined } from '@ant-design/icons';

interface IProps {
    className?: string;
    showIcon?: boolean;
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
        title: '面板',
        path: '/dashboard',
        icon: <HomeOutlined />,
    },
];

export default function Links(props: IProps) {
    const { className, showIcon = true } = props;

    return (
        <div className={`flex w-full gap-3 ${className}`}>
            {links.map((item) => (
                <Link
                    key={item.title}
                    href={item.path}
                    className="flex items-center p-2 rounded-lg gap-3 font-semibold hover:bg-custom-color-2 dark:hover:bg-custom-color-dark-2"
                >
                    <div>{showIcon && item.icon}</div>
                    <p>{item.title}</p>
                </Link>
            ))}
        </div>
    );
}
