import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';
import { allPosts } from 'contentlayer/generated';
import JsonLd from '@/components/seo/JsonLd';
import { createMetadata, getCanonicalUrl, siteConfig } from '@/lib/seo';

export const metadata = createMetadata({
	title: '文章列表',
	description: '查看 haimin 博客的全部技术文章，内容覆盖前端开发、Next.js、React、Web 实践与日常建站记录。',
	path: '/post',
	keywords: ['文章列表', '技术文章', '前端开发'],
});

export default function Home() {
	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'CollectionPage',
			name: '文章列表',
			url: getCanonicalUrl('/post'),
			description: 'haimin 博客的全部文章索引页。',
			inLanguage: 'zh-CN',
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
			],
		},
		{
			'@context': 'https://schema.org',
			'@type': 'ItemList',
			name: '文章目录',
			numberOfItems: allPosts.length,
			itemListElement: allPosts.map((post, index) => ({
				'@type': 'ListItem',
				position: index + 1,
				url: getCanonicalUrl(`/post/${post.slugAsParams}`),
				name: post.title,
				description: post.description || siteConfig.description,
			})),
		},
	];

	return (
		<Suspense>
			<div className="flex h-full flex-col items-center px-3 py-4 sm:px-4 lg:px-5">
				<JsonLd data={jsonLd} />
				<section className="mb-4 flex w-full max-w-[960px] flex-col gap-2 rounded-2xl px-1">
					<h1 className="text-font-strong dark:text-font-light-dark text-3xl font-black">文章列表</h1>
					<p className="text-font-normal dark:text-font-normal-dark text-sm leading-7">
						这里整理了站内全部文章，主要记录前端开发、Next.js 与 React 实践，以及博客搭建过程中的一些思考。
					</p>
				</section>
				<PostList></PostList>
			</div>
		</Suspense>
	);
}
