'use client';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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
	const scrollContainerRef = useRef<HTMLDivElement | null>(null);
	const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
	const scrollFrameRef = useRef<number | null>(null);

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

		const handleScroll = () => {
			if (scrollFrameRef.current !== null) return;

			scrollFrameRef.current = window.requestAnimationFrame(() => {
				updateActiveHeading();
				scrollFrameRef.current = null;
			});
		};

		updateActiveHeading();
		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', updateActiveHeading);

		return () => {
			if (scrollFrameRef.current !== null) {
				window.cancelAnimationFrame(scrollFrameRef.current);
				scrollFrameRef.current = null;
			}

			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', updateActiveHeading);
		};
	}, [headings]);

	useEffect(() => {
		if (!activeId) return;

		const container = scrollContainerRef.current;
		const activeItem = itemRefs.current[activeId];
		if (!container || !activeItem) return;

		const containerTop = container.scrollTop;
		const containerHeight = container.clientHeight;
		const containerBottom = containerTop + containerHeight;
		const itemTop = activeItem.offsetTop;
		const itemBottom = itemTop + activeItem.offsetHeight;
		const padding = 18;

		if (itemTop < containerTop + padding) {
			const targetTop = Math.max(itemTop - containerHeight * 0.2, 0);

			container.scrollTo({
				top: targetTop,
				behavior: 'smooth',
			});
			return;
		}

		if (itemBottom > containerBottom - padding) {
			const targetTop = Math.max(itemBottom - containerHeight * 0.8, 0);

			container.scrollTo({
				top: targetTop,
				behavior: 'smooth',
			});
		}
	}, [activeId]);

	if (headings.length === 0) return null;

	return (
		<div className={clsx('sticky top-16 flex max-h-[50vh] min-h-0 w-full flex-col', props.className)}>
			<span className="text-font-strong dark:text-font-light-dark p-1 font-medium">目录</span>
			<div className="bg-custom-color-9 dark:border-custom-color-dark-7 dark:bg-custom-color-dark-9 w-full overflow-hidden rounded-xl shadow-md">
				<div
					ref={scrollContainerRef}
					className="no-scrollbar flex max-h-[calc(50vh-2.25rem)] min-h-0 w-full snap-y snap-proximity flex-col gap-2 overflow-y-auto overflow-x-hidden overscroll-contain scroll-smooth px-3 py-3"
				>
					{headings.map((item) => {
						return (
							<a
								key={item.id}
								ref={(node) => {
									itemRefs.current[item.id] = node;
								}}
								href={`#${item.id}`}
								style={{
									paddingLeft: `${Math.max(item.level - 2, 0) * 10}px`,
								}}
								className={clsx(
									'block snap-start break-words leading-7 text-balance transition-colors hover:text-[#369ccf]',
									{
										'text-[#369ccf]': item.id === activeId,
									}
								)}
							>
								{item.text}
							</a>
						);
					})}
				</div>
			</div>
		</div>
	);
}
