'use client';
import { BarChartOutlined, CalendarOutlined, FileTextOutlined, UserOutlined } from '@ant-design/icons';
import { allPosts } from 'contentlayer/generated';
import Script from 'next/dist/client/script';

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
    ];
    return (
        <div className="flex flex-col w-full p-1 gap-1">
            <Script
                id="busuanzi"
                strategy="afterInteractive"
                src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
            ></Script>
            <h1 className="ml-1 text-font-strong dark:text-font-strong-dark font-normal">博客信息</h1>
            <ul className="flex flex-col justify-center gap-3 p-3 w-full bg-custom-color-7 dark:bg-custom-color-dark-7 rounded-md">
                {blogInfos.map((item) => {
                    return (
                        <li key={item.title} className="flex flex-1 items-center">
                            <div className="flex flex-1 items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {item.icon}
                                    <span className=" max-xl:hidden">{item.title}</span>
                                </div>
                                <span>{item.value}</span>
                            </div>
                        </li>
                    );
                })}
                <li className="flex flex-1 items-center">
                    <div id="busuanzi_container_site_uv" className="w-full">
                        <div className="flex flex-1 items-center justify-between">
                            <div className="flex items-center gap-2">
                                <UserOutlined />
                                <span className=" max-xl:hidden">访问人数</span>
                            </div>

                            <span id="busuanzi_value_site_uv"></span>
                        </div>
                    </div>
                </li>
                <li className="flex flex-1 items-center">
                    <div id="busuanzi_container_site_pv" className="w-full">
                        <div className="flex flex-1 items-center justify-between">
                            <div className="flex items-center gap-2">
                                <BarChartOutlined />
                                <span className=" max-xl:hidden">总访问量</span>
                            </div>
                            <span id="busuanzi_value_site_pv"></span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}
