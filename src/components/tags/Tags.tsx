'use client';
import { useRouter } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';

interface IProps {
    className?: string;
}

export default function Tags(props: IProps) {
    const router = useRouter();
    const tags: { tag: string; count: number }[] = [];
    allPosts.forEach((item) =>
        item.tags?.forEach((subItem) => {
            const targetTag = tags.find((targe) => targe.tag === subItem);
            if (targetTag) {
                targetTag.count++;
            } else {
                tags.push({ tag: subItem, count: 1 });
            }
        })
    );
    return (
        <div className="flex flex-col w-full gap-1" {...props}>
            <span className="ml-1 text-font-strong dark:text-font-light-dark font-medium">标签</span>
            <ul className="flex flex-wrap gap-3 p-3 w-full shadow-md bg-custom-color-7 dark:bg-custom-color-dark-7 rounded-md">
                {tags.map((item) => {
                    return (
                        <li key={item.tag}>
                            <Link href={{ pathname: '/post', query: { tag: item.tag } }}>
                                {item.tag}({item.count})
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
