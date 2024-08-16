import { Metadata } from 'next';
import Image from 'next/image';
import bird0 from 'public/bird0.svg';
export const metadata: Metadata = {
	title: '友情链接|巅峰之路',
	description: '一个记录开发收获和日常生活的个人站点,主要涉及前端开发,web技术相关内容',
	keywords: ['haimin', 'haiminovo', 'road to top', 'road to the top', '巅峰之路', '巅峰路', '前端'],
};
export default function FriendlyLink() {
	const friendLinks: any[] = [
		{
			title: 'test的blog',
			desc: '测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容测试内容，测试内容，测试内容',
			link: 'http://haiminovo.cn',
		},
	];
	return (
		<div className="flex h-full flex-col items-center p-6 max-md:p-4">
			<ul className="flex w-full flex-wrap gap-4">
				{friendLinks.map((item, index) => {
					return (
						<li
							key={index}
							className="h-36 min-w-64 basis-[calc(50%-8px)] rounded-xl bg-custom-color-4 shadow-xl max-md:flex-grow dark:bg-custom-color-dark-4"
						>
							<a href={item.link} className="flex h-full w-full items-center gap-4 p-4">
								<div className="relative h-28 w-28">
									<Image className="rounded-xl" src={bird0} alt={item.title + '博客图像'} fill></Image>
								</div>
								<div className="flex h-full flex-1 flex-col gap-2">
									<strong className="text-xl">{item.title}</strong>
									<p className="line-clamp-3 text-ellipsis break-all">{item.desc}</p>
								</div>
							</a>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
