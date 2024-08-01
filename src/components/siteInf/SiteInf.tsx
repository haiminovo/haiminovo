'use client';
import { CalendarOutlined, DisconnectOutlined, FileTextOutlined } from '@ant-design/icons';
import { allPosts } from 'contentlayer/generated';

export default function SiteInf() {
    const blogInfos = [
        {
            title: '文章总计',
            icon: <FileTextOutlined />,
            value: allPosts.length,
        },
        {
            title: '运行时长',
            icon: <CalendarOutlined />,
            value: ((new Date().getTime() - new Date('2024-07-25').getTime()) / 86400000).toFixed(2) + '天',
        },
        {
            title: '最后活跃',
            icon: <DisconnectOutlined />,
            value: 'mock',
        },
    ];
    return (
        <div className="flex flex-col w-full p-1 gap-1">
            <h1 className="ml-1 text-font-strong dark:text-font-strong-dark font-normal">博客信息</h1>
            <div className="flex flex-col w-full h-28 bg-custom-color-7 dark:bg-custom-color-dark-7 rounded-md">
                {blogInfos.map((item) => {
                    return (
                        <li key={item.title} className="flex flex-1 items-center justify-between px-3">
                            <div className="flex gap-2">
                                <span>{item.icon}</span>
                                <span className=" max-xl:hidden">{item.title}</span>
                            </div>
                            <span>{item.value}</span>
                        </li>
                    );
                })}
            </div>
        </div>
    );
}
