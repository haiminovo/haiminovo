import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx/mdx-components';
import Image from 'next/image';
import JsonLd from '@/components/seo/JsonLd';
import { createMetadata, getCanonicalUrl, getSeoImage, mergeKeywords, siteConfig } from '@/lib/seo';

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
	return page;
}

export async function generateStaticParams(): Promise<RouteParams[]> {
	return allPosts.map((page: { slugAsParams: string }) => ({
		post: page.slugAsParams,
	}));
}

export async function generateMetadata({ params }: PageProps) {
	const resolvedParams = await params;
	const page = getPageFromParams(resolvedParams);
	if (!page) {
		return createMetadata({
			title: '文章',
			description: siteConfig.description,
			path: '/post',
			keywords: ['文章'],
		});
	}

	return createMetadata({
		title: page.title,
		description: `${page.description} | 来自 roadto.top — haimin 的技术博客。`,
		path: `/post/${page.slugAsParams}`,
		keywords: [...(page.tags || []), 'roadto.top', 'haimin', '巅峰之路'],
		image: page.image,
		type: 'article',
		publishedTime: page.date,
		modifiedTime: page.date,
	});
}

export default async function Post({ params }: PageProps) {
	const resolvedParams = await params;
	const page = getPageFromParams(resolvedParams);
	if (!page) notFound();
	const imageSrc = page.image?.trim();
	const articleUrl = getCanonicalUrl(`/post/${page.slugAsParams}`);
	const articleImage = getSeoImage(page.image);
	const articleKeywords = mergeKeywords(page.tags || []);
	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'BlogPosting',
			mainEntityOfPage: articleUrl,
			headline: page.title,
			description: page.description || siteConfig.description,
			datePublished: page.date,
			dateModified: page.date,
			image: [articleImage],
			url: articleUrl,
			inLanguage: 'zh-CN',
			author: page.authors.map((author: string) => ({
				'@type': 'Person',
				name: author,
			})),
			publisher: {
				'@type': 'Organization',
				name: siteConfig.name,
				url: siteConfig.url,
				logo: {
					'@type': 'ImageObject',
					url: getSeoImage('/favicon/favicon.ico'),
				},
			},
			keywords: articleKeywords.join(', '),
			articleSection: page.tags || [],
		},
		{
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{
					'@type': 'ListItem',
					position: 1,
					name: '首页',
					item: getCanonicalUrl('/'),
				},
				{
					'@type': 'ListItem',
					position: 2,
					name: '文章列表',
					item: getCanonicalUrl('/post'),
				},
				{
					'@type': 'ListItem',
					position: 3,
					name: page.title,
					item: articleUrl,
				},
			],
		},
	];

	return (
		<article id="article" className="mx-auto flex w-full max-w-[960px] flex-col gap-4 max-xl:max-w-[860px]">
			<div className="paper-reading-panel flex flex-col">
				<JsonLd data={jsonLd} />
				<h1 className="my-4 border-b border-gray-500/50 pb-2 text-3xl font-black break-words lg:text-4xl">{page.title}</h1>
				{page.description && <p className="text-base indent-8 break-words lg:text-lg">{page.description}</p>}
				<div className="text-font-strong dark:text-font-light-dark flex flex-wrap items-center gap-2 py-4 text-sm">
					<time
						dateTime={page.date}
						className="from-custom-color-1 to-custom-color-9 dark:from-custom-color-dark-10 dark:to-custom-color-dark-5 rounded-md bg-gradient-to-t px-3 py-1 shadow-sm"
					>
						发布于 {page.date.slice(0, 10)}
					</time>
					{page.authors.map((author: string) => (
						<span
							key={author}
							className="from-custom-color-1 to-custom-color-9 dark:from-custom-color-dark-10 dark:to-custom-color-dark-5 rounded-md bg-gradient-to-t px-3 py-1 shadow-sm"
						>
							作者 {author}
						</span>
					))}
					{page.tags?.map((tag: string) => (
						<span
							key={tag}
							className="from-custom-color-1 to-custom-color-9 dark:from-custom-color-dark-10 dark:to-custom-color-dark-5 rounded-md bg-gradient-to-t px-3 py-1 shadow-sm"
						>
							#{tag}
						</span>
					))}
				</div>
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
