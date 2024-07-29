'use client';
import Image from 'next/image';
import { ClockCircleOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons';
import { isDesktop, isTablet, isMobile } from 'react-device-detect';
import type { Post } from 'contentlayer/generated';
import { useLayoutEffect, useState } from 'react';

interface IProps {
    data: Post;
    className?: string;
    onClick?: () => void;
}

export default function Post(props: IProps) {
    const [imageSize, setImageSize] = useState(64);
    const { data, className, onClick } = props;
    const { title, description, authors, date } = data;
    console.log(isMobile, isTablet, isDesktop);
    useLayoutEffect(() => {
        setImageSize(isMobile ? 48 : isTablet ? 64 : isDesktop ? 128 : 64);
    }, []);
    return (
        <div
            className={`flex items-center gap-4 w-full h-40 rounded-2xl bg-white p-4 cursor-pointer ${className}`}
            onClick={onClick}
        >
            <Image alt="文章头图" src={'/bird0.svg'} width={imageSize} height={imageSize}></Image>
            <div className="flex flex-col justify-between gap-1 w-full h-full">
                <div className="flex flex-col w-full h-40">
                    <h1 className="text-[#333] font-medium">{title}</h1>
                    <div className="flex-1 w-full h-full text-sm overflow-hidden text-ellipsis line-clamp-4">
                        {description}
                    </div>
                </div>

                <div className="flex justify-end gap-8 bg-gradient-to-r from-[rgba(255,255,255,1)] to-[rgba(245,249,246,1)] p-1 rounded-md px-3 text-xs text-[#888]">
                    <li className="flex items-center h-full gap-2">
                        <UserOutlined />
                        {authors.map((item) => (
                            <a key={item} href="">
                                {item}
                            </a>
                        ))}
                    </li>
                    <li className="flex items-center gap-2 whitespace-nowrap">
                        <ClockCircleOutlined />
                        <a href="">{date.slice(0, 10)}</a>
                    </li>
                </div>
            </div>
        </div>
    );
}
