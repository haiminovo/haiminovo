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
		<div className={`flex w-full flex-col ${props.className}`}>
			<span className="w-full p-1 font-medium text-font-strong dark:text-font-light-dark">标签</span>
			<ul className="flex w-full flex-wrap gap-3 rounded-xl border bg-custom-color-9 p-3 shadow-md dark:border-custom-color-dark-7 dark:bg-custom-color-dark-9">
				{tags.map((item) => {
					return (
						<li key={item.tag}>
							<Link
								href={{
									pathname: '/post',
									query: {
										tag: item.tag,
									},
								}}
							>
								{item.tag}({item.count})
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
