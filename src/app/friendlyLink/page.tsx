import { createMetadata } from '@/lib/seo';
import FriendlyLinkCard from '@/components/friendlyLink/FriendlyLinkCard';

interface FriendLink {
	title?: string;
	link: string;
	desc?: string;
}

export const metadata = createMetadata({
	title: '友情链接',
	description:
		'roadto.top 友情链接 — 收录值得常逛的个人博客、独立站点与技术社区，欢迎互换友链。',
	path: '/friendlyLink',
	keywords: ['友情链接', '博客推荐', '独立站', '友链交换', 'roadto.top'],
});

const friendLinks: FriendLink[] = [
	{
		link: 'http://www.rainlink.blog/',
	},
	{
		link: 'https://blog.2001717.xyz/',
	},
	{
		link: 'http://124.221.46.44/',
	},
	{
		link: 'https://islin.cn/',
	},
	{
		link: 'https://www.roadto.top/',
	},
];

const favoriteSites: FriendLink[] = [
	{
		link: 'https://yaohuo.me/',
	},
	{
		link: 'https://linux.do/',
	},
	{
		link: 'https://www.milkywayidlecn.com/?ref=344922',
	},
];

export default function FriendlyLink() {
	return (
		<div className="flex h-full flex-col items-center p-6 max-md:p-4">
			<div className="mb-6 flex w-full flex-col gap-2">
				<h1 className="text-3xl font-black">友情链接</h1>
				<p className="text-sm leading-7 opacity-80">收录一些朋友们的个人空间。</p>
			</div>
			{friendLinks.length === 0 ? (
				<div className="bg-custom-color-10 dark:bg-custom-color-dark-7 w-full rounded-xl p-8 text-center shadow-md">
					<p className="text-lg font-semibold">友链席位暂时空着</p>
					<p className="mt-2 text-sm opacity-80">后面可以把你的常用站点、朋友博客或者自己的其它项目加进来。</p>
				</div>
			) : (
				<ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
					{friendLinks.map((item) => {
						return (
							<li
								key={item.link}
								className="bg-custom-color-10/80 dark:bg-custom-color-dark-7/80 rounded-xl border border-slate-200/50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300/60 hover:bg-white/80 hover:shadow-md dark:border-slate-600/30 dark:hover:border-slate-500/50 dark:hover:bg-slate-700/80"
							>
								<FriendlyLinkCard title={item.title} link={item.link} desc={item.desc} />
							</li>
						);
					})}
				</ul>
			)}

			<div className="mb-6 mt-10 flex w-full flex-col gap-2">
				<h2 className="text-2xl font-bold">喜欢的站点</h2>
				<p className="text-sm leading-7 opacity-80">经常逛的一些有趣的站点。</p>
			</div>
			<ul className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2">
				{favoriteSites.map((item) => {
					return (
						<li
							key={item.link}
							className="bg-custom-color-10/80 dark:bg-custom-color-dark-7/80 rounded-xl border border-slate-200/50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300/60 hover:bg-white/80 hover:shadow-md dark:border-slate-600/30 dark:hover:border-slate-500/50 dark:hover:bg-slate-700/80"
						>
							<FriendlyLinkCard title={item.title} link={item.link} desc={item.desc} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}
