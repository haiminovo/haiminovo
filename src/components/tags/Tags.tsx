import { allPosts } from 'contentlayer/generated';
import Link from 'next/link';

interface IProps {
	className?: string;
}

export default function Tags(props: IProps) {
	const tagMap = new Map<string, number>();

	allPosts.forEach((item) => {
		item.tags?.forEach((tag) => {
			tagMap.set(tag, (tagMap.get(tag) ?? 0) + 1);
		});
	});

	const tags = Array.from(tagMap.entries())
		.map(([tag, count]) => ({ tag, count }))
		.sort((prev, next) => next.count - prev.count || prev.tag.localeCompare(next.tag));

	return (
		<div className={`flex w-full flex-col ${props.className}`}>
			<span className="text-font-strong dark:text-font-light-dark w-full p-1 font-medium">标签</span>
			<ul className="bg-custom-color-9 dark:border-custom-color-dark-7 dark:bg-custom-color-dark-9 flex w-full flex-wrap gap-3 rounded-xl p-3 shadow-md">
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
