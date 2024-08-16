'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface IProps {
	className?: string;
}

export default function PageNavigator(props: IProps) {
	const pathName = usePathname();
	const [dots, setDots] = useState<{ id: string; text: string; level: number }[]>();
	useEffect(() => {
		const artical: any = document.getElementById('artical');
		if (artical) {
			const filter = function (node: any) {
				return node.id ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
			};
			const iterator = document.createTreeWalker(artical, NodeFilter.SHOW_ELEMENT, filter);
			let node: any = iterator.nextNode();
			const reg = /^H([1-6])$/;
			const dotArr = [];
			while (node !== null) {
				dotArr.push({
					id: node.id,
					text: node.innerText,
					level: +node.tagName.match(reg)?.[1] - 1,
				});
				node = iterator.nextNode();
			}
			setDots(dotArr);
		} else {
			setDots(undefined);
		}
	}, [pathName]);
	return (
		<>
			{dots && (
				<div className={`sticky top-16 flex max-h-[50vh] w-full flex-col gap-1 ${props.className}`}>
					<span className="ml-1 font-medium text-font-strong dark:text-font-light-dark">目录</span>
					<div className="no-scrollbar flex w-full flex-col gap-2 overflow-auto rounded-md bg-custom-color-7 p-3 shadow-md dark:bg-custom-color-dark-7">
						{dots.map((item) => {
							return (
								<a
									key={item.id}
									href={`#${item.id}`}
									style={{
										marginLeft: `${(item.level - 1) * 6}px`,
									}}
									className="break-all"
								>
									{item.text}
								</a>
							);
						})}
					</div>
				</div>
			)}
		</>
	);
}
