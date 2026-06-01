import Image from 'next/image';
import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';
import { allPosts } from 'contentlayer/generated';
import JsonLd from '@/components/seo/JsonLd';
import { createMetadata, getCanonicalUrl, getSeoImage, siteConfig } from '@/lib/seo';
import { getRecentPosts } from '@/lib/posts';

export const metadata = createMetadata({
	description: 'haimin 在互联网的阴湿据点。',
	path: '/',
	keywords: ['roadto.top', 'roadtotop', '巅峰之路', 'haiminovo', '海敏', 'haimin'],
});

export default function Home() {
	const latestPosts = getRecentPosts(allPosts, 3);
	const jsonLd = [
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: siteConfig.name,
			alternateName: siteConfig.title,
			url: siteConfig.url,
			description: siteConfig.description,
			inLanguage: 'zh-CN',
			publisher: {
				'@type': 'Organization',
				name: siteConfig.name,
				url: siteConfig.url,
			},
		},
		{
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: siteConfig.author.name,
			url: siteConfig.author.url,
			description: '前端开发者，持续记录 Next.js、React 与 Web 技术实践。',
		},
		{
			'@context': 'https://schema.org',
			'@type': 'Blog',
			name: siteConfig.name,
			url: siteConfig.url,
			description: siteConfig.description,
			inLanguage: 'zh-CN',
			image: getSeoImage(),
			author: {
				'@type': 'Person',
				name: siteConfig.author.name,
				url: siteConfig.author.url,
			},
			blogPost: latestPosts.map((post) => ({
				'@type': 'BlogPosting',
				headline: post.title,
				url: getCanonicalUrl(`/post/${post.slugAsParams}`),
				datePublished: post.date,
				description: post.description || siteConfig.description,
			})),
		},
	];

	return (
		<Suspense>
			<div className="flex flex-col gap-4 px-3 pb-4 pt-4 sm:px-4 lg:px-5">
				<JsonLd data={jsonLd} />
				<section className="home-hero">
					<div className="home-hero__content">
						<div className="home-hero__avatar-shell">
							<div className="home-hero__avatar-ring">
								<Image
									className="h-full w-full rounded-full object-cover"
									src="/haimin.jpg"
									alt="haimin 头像"
									width={136}
									height={136}
									priority
								/>
							</div>
						</div>
						<div className="home-hero__copy">
							<h1 className="home-hero__title">Hi，我是 haimin。</h1>
							<p className="home-hero__intro">欢迎常来。</p>
						</div>
					</div>
				</section>
				<section className="flex flex-col gap-2">
					<div className="flex flex-col gap-1 px-1">
						<h2 className="text-font-strong dark:text-font-light-dark text-2xl font-black">近期更新</h2>
					</div>
					<PostList size={3}></PostList>
				</section>
			</div>
		</Suspense>
	);
}
