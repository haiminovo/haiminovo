import type { MetadataRoute } from 'next';
import { allPosts } from 'contentlayer/generated';
import { getCanonicalUrl } from '@/lib/seo';
import { toolItems } from '@/lib/tools-data';
import { sortPostsByDateDesc } from '@/lib/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
	const staticPages: MetadataRoute.Sitemap = [
		{
			url: getCanonicalUrl('/'),
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 1,
		},
		{
			url: getCanonicalUrl('/post'),
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.9,
		},
		{
			url: getCanonicalUrl('/friendlyLink'),
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.5,
		},
		{
			url: getCanonicalUrl('/tools'),
			lastModified: new Date(),
			changeFrequency: 'monthly',
			priority: 0.8,
		},
	];

	const toolPages: MetadataRoute.Sitemap = toolItems.map((tool) => ({
		url: getCanonicalUrl(tool.path),
		lastModified: new Date(),
		changeFrequency: 'monthly',
		priority: 0.7,
	}));

	const postPages: MetadataRoute.Sitemap = sortPostsByDateDesc(allPosts).map((post) => ({
		url: getCanonicalUrl(`/post/${post.slugAsParams}`),
		lastModified: new Date(post.date),
		changeFrequency: 'monthly',
		priority: 0.8,
	}));

	return [...staticPages, ...toolPages, ...postPages];
}
