import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { Mdx } from '@/components/mdx/mdx-components';
import '@/styles/mdx.css';
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

export default async function Post({ params }: PageProps) {
    const page = await getPageFromParams(params);
    if (!page) notFound();
    return (
        <article className="container max-w-3xl py-6 lg:py-12">
            <div className="space-y-4">
                <h1 className="inline-block font-heading text-4xl lg:text-5xl">{page.title}</h1>
                {page.description && <p className="text-xl text-muted-foreground">{page.description}</p>}
            </div>
            <hr className="my-4" />
            <Mdx code={page.body.code} />
        </article>
    );
}
