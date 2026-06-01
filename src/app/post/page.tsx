import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';
import { allPosts } from 'contentlayer/generated';
import JsonLd from '@/components/seo/JsonLd';
import { createMetadata, getCanonicalUrl, siteConfig } from '@/lib/seo';
import { sortPostsByDateDesc } from '@/lib/posts';

export const metadata = createMetadata({
	title: '文章列表',
	description:
		'roadto.top 文章列表 — 查看 haimin 的全部技术文章，涵盖前端开发、Next.js、React、Web 实践、建站记录与组件实现。',
	path: '/post',
	keywords: ['文章列表', '技术文章', '前端开发', 'Next.js 教程', 'React 实践', 'roadto.top'],
});

export default function Home() {
	const posts = sortPostsByDateDesc(allPosts);
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
			numberOfItems: posts.length,
			itemListElement: posts.map((post, index) => ({
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
						这里整理了站内全部文章。
					</p>
				</section>
				<PostList></PostList>
			</div>
		</Suspense>
	);
}
