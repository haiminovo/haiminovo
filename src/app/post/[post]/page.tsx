import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx/mdx-components';
import { Metadata } from 'next';
interface PageProps {
	params: {
		post: string;
	};
}

function getPageFromParams(params: { post: string }) {
	const slug = params?.post;
	const page = allPosts.find((page: { slugAsParams: string }) => page.slugAsParams === slug);
	if (!page) {
		null;
	}
	return page;
}

export async function generateStaticParams(): Promise<PageProps['params'][]> {
	return allPosts.map((page: { slugAsParams: string }) => ({
		post: page.slugAsParams,
	}));
}

export const metadata: Metadata = {
	title: '｜巅峰之路',
	description: '一个记录开发收获和日常生活的个人站点,主要涉及前端开发,web技术相关内容',
	keywords: ['haimin', 'haiminovo', 'road to top', 'road to the top', '巅峰之路', '巅峰路', '前端'],
};

export default function Post({ params }: PageProps) {
	const page = getPageFromParams(params);
	if (!page) notFound();
	metadata.title = page.title + (metadata?.title || '');
	metadata.description = page.description;
	metadata.keywords = page.tags;
	return (
		<article id="artical" className="container">
			<div className="py-6">
				<h1 className="break-all text-2xl font-black">{page.title}</h1>
				<hr className="my-4" />
				{page.description && <p className="break-all indent-8 text-lg">{page.description}</p>}
			</div>
			<Mdx code={page.body.code} />
		</article>
	);
}
