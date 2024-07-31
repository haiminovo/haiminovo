import Link from 'next/link';
import { HomeOutlined } from '@ant-design/icons';

export default function Links() {
    const links: {
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
    return (
        <div className="flex flex-col w-full gap-3">
            {links.map((item) => (
                <Link
                    key={item.title}
                    href={item.path}
                    className="flex items-center h-8 p-2 rounded-lg hover:bg-custom-color-2 dark:hover:bg-custom-color-dark-2 gap-4"
                >
                    <>{item.icon}</>
                    <p className="max-lg:hidden">{item.title}</p>
                </Link>
            ))}
        </div>
    );
}
