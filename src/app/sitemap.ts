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
			url: 'http://roadto.top/dashboard',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
		{
			url: 'http://roadto.top/friendLink',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
		{
			url: 'http://roadto.top/post',
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.8,
		},
	];
}
