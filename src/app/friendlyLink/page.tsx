import Image from 'next/image';
import bird0 from 'public/bird0.svg';
import { createMetadata } from '@/lib/seo';

interface FriendLink {
	title: string;
	link: string;
	desc: string;
}

export const metadata = createMetadata({
	title: '友情链接',
	description: '这里收录一些值得逛逛的个人博客和独立站点，也欢迎互换友链。',
	path: '/friendlyLink',
	keywords: ['友情链接', '博客推荐', '独立站'],
});

const friendLinks: FriendLink[] = [
	{
		title: 'RainLink',
		link: 'http://www.rainlink.blog/',
		desc: '一个值得逛逛的个人博客站点。',
	},
];

export default function FriendlyLink() {
	return (
		<div className="flex h-full flex-col items-center p-6 max-md:p-4">
			<div className="mb-5 flex w-full flex-col gap-2">
				<h1 className="text-3xl font-black">友情链接</h1>
				<p className="text-sm leading-7 opacity-80">收录一些值得常逛的博客、独立站和朋友们的个人空间。</p>
			</div>
			{friendLinks.length === 0 ? (
				<div className="bg-custom-color-10 dark:bg-custom-color-dark-7 w-full rounded-xl p-8 text-center shadow-md">
					<p className="text-lg font-semibold">友链席位暂时空着</p>
					<p className="mt-2 text-sm opacity-80">后面可以把你的常用站点、朋友博客或者自己的其它项目加进来。</p>
				</div>
			) : (
				<ul className="flex w-full flex-wrap gap-4">
					{friendLinks.map((item) => {
						return (
							<li
								key={item.link}
								className="bg-custom-color-10 dark:bg-custom-color-dark-7 h-36 min-w-64 basis-[calc(50%-8px)] rounded-xl shadow-xl max-md:flex-grow"
							>
								<a
									href={item.link}
									target="_blank"
									rel="noopener noreferrer"
									className="flex h-full w-full items-center gap-4 p-4"
								>
									<div className="relative h-28 w-28">
										<Image className="rounded-xl" src={bird0} alt={item.title + '博客图像'} fill></Image>
									</div>
									<div className="flex h-full flex-1 flex-col gap-2">
										<strong className="text-xl">{item.title}</strong>
										<p className="line-clamp-3 break-all text-ellipsis">{item.desc}</p>
									</div>
								</a>
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
}
