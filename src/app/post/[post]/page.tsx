import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx/mdx-components';
import { Metadata } from 'next';
interface PageProps {
    params: {
        post: string;
    };
}

async function getPageFromParams(params: { post: string }) {
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

export const metadata = async ({ params }: PageProps) => {
    const page = await getPageFromParams(params);
    const tags = page?.tags || [];
    const metaRes: Metadata = {
        title: `${page?.title}`,
        description: `${page?.description}`,
        applicationName: 'haiminovo',
        keywords: [...tags],
    };
    return metaRes;
};

export default async function Post({ params }: PageProps) {
    const page = await getPageFromParams(params);

    if (!page) notFound();
    return (
        <article id="artical" className="container py-6">
            <div className="space-y-4">
                <h1 className="inline-block text-4xl break-all">{page.title}</h1>
                {page.description && <p className="text-xl break-all">{page.description}</p>}
            </div>
            <hr className="my-4" />
            <Mdx code={page.body.code} />
        </article>
    );
}
