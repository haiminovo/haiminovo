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

export const metadata: Metadata = {};

export default function Post({ params }: PageProps) {
	const page = getPageFromParams(params);
	if (!page) notFound();
	metadata.title = page.title;
	metadata.description = page.description;
	metadata.keywords = page.tags;
	return (
		<article id="artical" className="container">
			<div className="py-6">
				<h1 className="text-2xl font-black break-all ">{page.title}</h1>
				<hr className="my-4" />
				{page.description && <p className="break-all indent-8 text-lg">{page.description}</p>}
			</div>
			<Mdx code={page.body.code} />
		</article>
	);
}
