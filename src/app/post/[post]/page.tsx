import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx/mdx-components';
import { Metadata } from 'next';
import Image from 'next/image';

interface PageProps {
	params: Promise<{
		post: string;
	}>;
}

interface RouteParams {
	post: string;
}

function getPageFromParams(params: RouteParams) {
	const slug = params?.post;
	const page = allPosts.find((page: { slugAsParams: string }) => page.slugAsParams === slug);
	if (!page) {
		null;
	}
	return page;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
	return allPosts.map((page: { slugAsParams: string }) => ({
		post: page.slugAsParams,
	}));
}

const baseMetadata: Metadata = {
	title: '｜巅峰之路',
	description: '一个记录开发收获和日常生活的个人站点,主要涉及前端开发,web技术相关内容',
	keywords: ['haimin', 'haiminovo', 'road to top', 'road to the top', '巅峰之路', '巅峰路', '前端'],
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
	const resolvedParams = await params;
	const page = getPageFromParams(resolvedParams);
	if (!page) return baseMetadata;

	return {
		...baseMetadata,
		title: page.title + (baseMetadata?.title || ''),
		description: page.description,
		keywords: page.tags,
	};
}

export default async function Post({ params }: PageProps) {
	const resolvedParams = await params;
	const page = getPageFromParams(resolvedParams);
	if (!page) notFound();
	const imageSrc = page.image?.trim();

	return (
		<article id="article" className="mx-auto flex w-full max-w-[960px] flex-col gap-4 max-xl:max-w-[860px]">
			<div className="paper-reading-panel flex flex-col">
				<h1 className="my-4 border-b border-gray-500/50 pb-2 text-3xl font-black break-words lg:text-4xl">{page.title}</h1>
				{page.description && <p className="text-base indent-8 break-words lg:text-lg">{page.description}</p>}
				<div className="block w-full py-4 dark:brightness-[.9]">
					{imageSrc && (
						<div className="bg-custom-color-8 dark:bg-custom-color-dark-8 relative aspect-[5/3] w-full overflow-hidden rounded-xl">
							<Image
								className="object-contain"
								src={imageSrc}
								alt={page.title + '头图'}
								fill
								priority
								sizes="(max-width: 1280px) 100vw, 1200px"
							></Image>
						</div>
					)}
				</div>
				<Mdx code={page.body.code} />
			</div>
		</article>
	);
}
