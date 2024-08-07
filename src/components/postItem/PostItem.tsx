'use client';
import Image from 'next/image';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';
import type { Post } from 'contentlayer/generated';
import { useEffect, useState } from 'react';

interface IProps {
    data: Post;
    className?: string;
    onClick?: () => void;
}

export default function PostItem(props: IProps) {
    const { data, className, onClick } = props;
    const { title, description, authors, date, tags } = data;
    const [imgSize, setImageSize] = useState(128);
    useEffect(() => {
        if (isMobile) {
            setImageSize(64);
        }
    }, []);
    return (
        <div
            className={`relative flex items-start gap-4 w-full h-40 shadow-lg rounded-2xl p-4 cursor-pointer max-md:h-36 max-md:p-2 max-md:gap-2
                bg-custom-color-5 dark:bg-custom-color-dark-5 ${className}`}
            onClick={onClick}
        >
            <Image className="rounded-lg" alt="文章头图" src={'/bird0.svg'} width={imgSize} height={imgSize}></Image>
            <div className="flex flex-col justify-between gap-4 w-full max-md:gap-2">
                <div className="flex flex-col justify-center w-full">
                    <strong className="font-medium text-font-strong dark:text-font-light-dark">{title}</strong>
                    <p className="w-full pl-1 text-xs text-ellipsis line-clamp-4 indent-1 text-font-normal dark:text-font-normal-dark">
                        {description}
                    </p>
                </div>
                <div className="flex justify-between w-full gap-2 bottom-2 left-1/2 px-2 max-md:-translate-x-1/2 max-md:absolute max-[425px]:justify-end">
                    <ul className="flex gap-2 max-[425px]:hidden">
                        {tags?.map((item) => (
                            <li
                                key={item}
                                className="flex items-center h-full rounded-md gap-2 px-2 text-xs shadow-md bg-gradient-to-tl 
                                from-custom-color-1 to-custom-color-5 text-font-light dark:text-font-light-dark 
                                dark:from-custom-color-dark-10 dark:to-custom-color-dark-5 "
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                    <ul
                        className="flex items-center gap-2 rounded-md px-2 text-xs p-1 shadow-md bg-gradient-to-tl 
                        text-font-light dark:text-font-light-dark 
                        from-custom-color-1 to-custom-color-5 dark:from-custom-color-dark-10 dark:to-custom-color-dark-5"
                    >
                        <li className="flex items-center h-full gap-2">
                            <UserOutlined />
                            {authors.map((item) => (
                                <div key={item}>{item}</div>
                            ))}
                        </li>
                        <li className="flex items-center gap-2 whitespace-nowrap">
                            <ClockCircleOutlined />
                            <div>{date.slice(0, 10)}</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
