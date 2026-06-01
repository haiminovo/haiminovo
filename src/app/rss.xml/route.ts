import { allPosts } from 'contentlayer/generated';
import { getCanonicalUrl, siteConfig } from '@/lib/seo';
import { sortPostsByDateDesc } from '@/lib/posts';

export const dynamic = 'force-static';

function escapeXml(value = '') {
	return value
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&apos;');
}

export function GET() {
	const posts = sortPostsByDateDesc(allPosts);
	const rssUrl = `${siteConfig.url}/rss.xml`;
	const lastBuildDate = posts[0]?.date ? new Date(posts[0].date).toUTCString() : new Date().toUTCString();

	const items = posts
		.map((post) => {
			const url = getCanonicalUrl(`/post/${post.slugAsParams}`);
			const categories = post.tags?.map((tag) => `<category>${escapeXml(tag)}</category>`).join('') || '';

			return `
		<item>
			<title>${escapeXml(post.title)}</title>
			<link>${url}</link>
			<guid isPermaLink="true">${url}</guid>
			<pubDate>${new Date(post.date).toUTCString()}</pubDate>
			<description>${escapeXml(post.description || siteConfig.description)}</description>
			${categories}
		</item>`;
		})
		.join('');

	const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	<channel>
		<title>${escapeXml(siteConfig.title)}</title>
		<link>${siteConfig.url}</link>
		<atom:link href="${rssUrl}" rel="self" type="application/rss+xml" />
		<description>${escapeXml(siteConfig.description)}</description>
		<language>zh-CN</language>
		<lastBuildDate>${lastBuildDate}</lastBuildDate>
		${items}
	</channel>
</rss>`;

	return new Response(rss, {
		headers: {
			'Content-Type': 'application/rss+xml; charset=utf-8',
		},
	});
}
