import { createMetadata } from '@/lib/seo';

export const metadata = createMetadata({
	title: '照片页',
	description: '照片页仍在建设中，暂不参与搜索引擎收录。',
	path: '/photo',
	keywords: ['照片页'],
	noIndex: true,
});

export default function Photo() {
	return (
		<div className="flex h-full flex-col items-center p-6 max-md:p-4">
			<div className="bg-custom-color-10 dark:bg-custom-color-dark-7 w-full rounded-xl p-8 text-center shadow-md">
				<h1 className="text-2xl font-black">照片页建设中</h1>
				<p className="mt-3 text-sm opacity-80">这里后面很适合放旅行、随手拍或者项目截图集。</p>
			</div>
		</div>
	);
}
