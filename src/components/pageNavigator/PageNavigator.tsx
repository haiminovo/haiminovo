'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface IProps {
	className?: string;
}

interface HeadingItem {
	id: string;
	text: string;
	level: number;
	offsetY: number;
}

export default function PageNavigator(props: IProps) {
	const pathName = usePathname();
	const [headings, setHeadings] = useState<HeadingItem[]>([]);
	const [activeId, setActiveId] = useState<string>();

	useEffect(() => {
		const article = document.getElementById('article');
		if (!article) {
			setHeadings([]);
			setActiveId(undefined);
			return;
		}

		const headingNodes = Array.from(
			article.querySelectorAll<HTMLElement>('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]')
		);
		const nextHeadings = headingNodes.map((node) => ({
			id: node.id,
			text: node.innerText,
			level: Number(node.tagName.slice(1)),
			offsetY: node.offsetTop,
		}));

		setHeadings(nextHeadings);
		setActiveId(nextHeadings[0]?.id);
	}, [pathName]);

	useEffect(() => {
		if (headings.length === 0) return;

		const updateActiveHeading = () => {
			const scrollPosition = window.scrollY + 96;
			let currentId = headings[0]?.id;

			for (const heading of headings) {
				if (heading.offsetY <= scrollPosition) {
					currentId = heading.id;
				} else {
					break;
				}
			}

			setActiveId((prev) => (prev === currentId ? prev : currentId));
		};

		updateActiveHeading();
		window.addEventListener('scroll', updateActiveHeading, { passive: true });
		window.addEventListener('resize', updateActiveHeading);

		return () => {
			window.removeEventListener('scroll', updateActiveHeading);
			window.removeEventListener('resize', updateActiveHeading);
		};
	}, [headings]);

	if (headings.length === 0) return null;

	return (
		<div className={clsx('sticky top-16 flex max-h-[50vh] w-full flex-col', props.className)}>
			<span className="text-font-strong dark:text-font-light-dark p-1 font-medium">目录</span>
			<div className="no-scrollbar bg-custom-color-9 dark:border-custom-color-dark-7 dark:bg-custom-color-dark-9 flex w-full flex-col gap-2 overflow-auto rounded-xl p-3 shadow-md">
				{headings.map((item) => {
					return (
						<a
							key={item.id}
							href={`#${item.id}`}
							style={{
								marginLeft: `${Math.max(item.level - 2, 0) * 10}px`,
							}}
							className={clsx('break-all transition-colors hover:text-[#369ccf]', {
								'text-[#369ccf]': item.id === activeId,
							})}
						>
							{item.text}
						</a>
					);
				})}
			</div>
		</div>
	);
}
