import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: 'http://roadto.top',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: 'http://roadto.top/about',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.5,
		},
		{
			url: 'http://roadto.top/friendlyLink/',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.5,
		},
		{
			url: 'http://roadto.top/post/',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
		{
			url: 'http://roadto.top/post/create-my-blog/',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
		{
			url: 'http://roadto.top/post/components-of-my-blog/',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
	];
}
