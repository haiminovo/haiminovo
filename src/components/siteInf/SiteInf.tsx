'use client';
import { CalendarOutlined, FileTextOutlined, LoadingOutlined } from '@ant-design/icons';
import { allPosts } from 'contentlayer/generated';
import { useEffect, useState } from 'react';

export default function SiteInf() {
	const [runtime, setRuntime] = useState<string>();

	useEffect(() => {
		const launchDate = new Date('2024-07-25');
		const runtimeDays = Math.floor((Date.now() - launchDate.getTime()) / 86400000);
		setRuntime(`${runtimeDays} 天`);
	}, []);

	const blogInfos = [
		{
			title: '文章总计',
			icon: <FileTextOutlined />,
			value: allPosts.length + ' 篇',
		},
		{
			title: '运行时长',
			icon: <CalendarOutlined />,
			value: runtime,
		},
	];

	return (
		<div className="flex w-full flex-col">
			<span className="text-font-strong dark:text-font-light-dark p-1 font-medium">站点信息</span>
			<ul className="bg-custom-color-9 dark:border-custom-color-dark-7 dark:bg-custom-color-dark-9 flex w-full flex-1 flex-col justify-center gap-3 rounded-xl p-3 shadow-md">
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
			</ul>
		</div>
	);
}
