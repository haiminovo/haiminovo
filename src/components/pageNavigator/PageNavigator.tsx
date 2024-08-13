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
                dotArr.push({ id: node.id, text: node.innerText, level: +node.tagName.match(reg)?.[1] - 1 });
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
                <div className={`sticky top-16 flex flex-col w-full gap-1 max-h-[50vh] ${props.className}`}>
                    <span className="ml-1 text-font-strong dark:text-font-light-dark font-medium">目录</span>
                    <div
                        className="flex flex-col gap-2 p-3 w-full shadow-md rounded-md overflow-auto no-scrollbar
                         bg-custom-color-7 dark:bg-custom-color-dark-7 "
                    >
                        {dots.map((item) => {
                            return (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    style={{ marginLeft: `${(item.level - 1) * 6}px` }}
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
