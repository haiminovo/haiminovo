'use client';
import { BarChartOutlined, CalendarOutlined, FileTextOutlined, LoadingOutlined } from '@ant-design/icons';
import { allPosts } from 'contentlayer/generated';
import { useLayoutEffect, useState } from 'react';

export default function SiteInf() {
	const [runtime, setRuntime] = useState<string>();
	useLayoutEffect(() => {
		setRuntime(((new Date().getTime() - new Date('2024-07-25').getTime()) / 86400000).toFixed(2) + '天');
	}, []);
	const blogInfos = [
		{
			title: '文章总计',
			icon: <FileTextOutlined />,
			value: allPosts.length,
		},
		{
			title: '运行时长',
			icon: <CalendarOutlined />,
			value: runtime,
		},
	];

	return (
		<div className="flex w-full flex-col gap-1">
			<span className="ml-1 font-medium text-font-strong dark:text-font-light-dark">站点信息</span>
			<ul className="flex w-full flex-1 flex-col justify-center gap-3 rounded-md bg-custom-color-7 p-3 shadow-md dark:bg-custom-color-dark-7">
				{blogInfos.map((item) => {
					return (
						<li key={item.title} className="flex flex-1 items-center">
							<div className="flex flex-1 items-center justify-between">
								<div className="flex items-center gap-2 whitespace-nowrap">
									{item.icon}
									<span>{item.title}</span>
								</div>
								<span>{item.value || <LoadingOutlined />}</span>
							</div>
						</li>
					);
				})}
				<li className="flex flex-1 items-center">
					<div id="busuanzi_container_site_pv" className="w-full">
						<div className="flex flex-1 items-center justify-between">
							<div className="flex items-center gap-2 whitespace-nowrap">
								<BarChartOutlined />
								<span>总访问量</span>
							</div>
							<span id="busuanzi_value_site_pv">
								<LoadingOutlined />
							</span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	);
}
