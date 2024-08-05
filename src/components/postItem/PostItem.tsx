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
    const { title, description, authors, date } = data;
    const [imgSize, setImageSize] = useState(128);
    useEffect(() => {
        if (isMobile) {
            setImageSize(64);
        }
    }, []);
    return (
        <div
            className={`flex items-start gap-4 w-full h-40 rounded-2xl p-4 cursor-pointer max-md:p-2 max-md:h-32 ${className}`}
            onClick={onClick}
        >
            <Image className="rounded-lg" alt="文章头图" src={'/bird0.svg'} width={imgSize} height={imgSize}></Image>
            <div className="flex flex-col justify-between gap-1 w-full h-full">
                <div className="flex flex-col justify-center w-full">
                    <strong className="font-medium text-font-strong dark:text-font-light-dark">{title}</strong>
                    <p className="w-full pl-1 text-xs text-ellipsis line-clamp-4 indent-1 text-font-normal dark:text-font-normal-dark">
                        {description}
                    </p>
                </div>

                <ul
                    className="flex justify-end gap-5 bg-gradient-to-l rounded-md px-3 text-xs p-1
                 from-custom-color-10 to-custom-color-7 text-font-light 
                 dark:from-custom-color-dark-10 dark:to-custom-color-dark-7 dark:text-font-light-dark 
                "
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
    );
}
