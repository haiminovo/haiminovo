import type { Metadata } from 'next';

export const siteConfig = {
	name: '巅峰之路',
	title: '巅峰之路 | haimin 的互联网自留地',
	description:
		'roadto.top — haimin 的个人博客，收录前端开发、Next.js / React 实践、Web 技术文章，以及友情链接与建站记录。',
	url: 'https://roadto.top',
	locale: 'zh_CN',
	defaultOgImage: '/haimin.jpg',
	author: {
		name: 'haimin',
		handle: 'haiminovo',
		url: 'https://roadto.top',
	},
	keywords: [
		'roadto.top',
		'roadtotop',
		'巅峰之路',
		'haimin',
		'haiminovo',
		'海敏',
		'个人博客',
		'技术博客',
		'程序员博客',
		'独立博客',
		'前端开发',
		'前端博客',
		'Next.js',
		'React',
		'Web 开发',
		'全栈开发',
		'TypeScript',
		'Node.js',
		'建站记录',
		'技术文章',
		'开发笔记',
		'UI 设计',
		'CSS 技巧',
		'博客组件',
		'友情链接',
		'开源项目',
	],
} as const;

const DEFAULT_ROBOTS = {
	index: true,
	follow: true,
	googleBot: {
		index: true,
		follow: true,
		'max-image-preview': 'large' as const,
		'max-snippet': -1,
		'max-video-preview': -1,
	},
};

function normalizePath(path: string) {
	if (!path || path === '/') return '/';

	return path.endsWith('/') ? path : `${path}/`;
}

export function formatPageTitle(title?: string) {
	return title ? `${title} | ${siteConfig.name}` : siteConfig.title;
}

export function getCanonicalUrl(path = '/') {
	const normalizedPath = normalizePath(path);

	if (normalizedPath === '/') return siteConfig.url;

	return new URL(normalizedPath, siteConfig.url).toString();
}

export function getSeoImage(image?: string | null) {
	const imagePath = image?.trim() ? image.trim() : siteConfig.defaultOgImage;

	if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
		return imagePath;
	}

	return new URL(imagePath.startsWith('/') ? imagePath : `/${imagePath}`, siteConfig.url).toString();
}

export function mergeKeywords(keywords: string[] = []) {
	return Array.from(new Set([...siteConfig.keywords, ...keywords.filter(Boolean)]));
}

interface MetadataInput {
	title?: string;
	description?: string;
	path?: string;
	keywords?: string[];
	image?: string | null;
	type?: 'website' | 'article';
	noIndex?: boolean;
	publishedTime?: string;
	modifiedTime?: string;
}

export function createMetadata({
	title,
	description = siteConfig.description,
	path = '/',
	keywords = [],
	image,
	type = 'website',
	noIndex = false,
	publishedTime,
	modifiedTime,
}: MetadataInput): Metadata {
	const canonical = getCanonicalUrl(path);
	const seoImage = getSeoImage(image);
	const fullTitle = formatPageTitle(title);
	const mergedKeywords = mergeKeywords(keywords);

	return {
		title,
		description,
		keywords: mergedKeywords,
		alternates: {
			canonical,
		},
		authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
		creator: siteConfig.author.name,
		publisher: siteConfig.name,
		category: 'technology',
		robots: noIndex
			? {
					index: false,
					follow: true,
					googleBot: {
						...DEFAULT_ROBOTS.googleBot,
						index: false,
					},
				}
			: DEFAULT_ROBOTS,
		openGraph: {
			type,
			locale: siteConfig.locale,
			url: canonical,
			siteName: siteConfig.name,
			title: fullTitle,
			description,
			images: [
				{
					url: seoImage,
					width: 1200,
					height: 630,
					alt: title ? `${title} 的分享预览图` : `${siteConfig.name} 的分享预览图`,
				},
			],
			...(publishedTime ? { publishedTime } : {}),
			...(modifiedTime ? { modifiedTime } : {}),
			...(type === 'article' && keywords.length > 0 ? { tags: keywords } : {}),
		},
		twitter: {
			card: 'summary_large_image',
			title: fullTitle,
			description,
			images: [seoImage],
			creator: `@${siteConfig.author.handle}`,
		},
	};
}
