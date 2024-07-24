'use client';
import { Typography } from 'antd';
const { Paragraph } = Typography;
import Image from 'next/image';
import { ClockCircleOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons';
import { isBrowser } from 'react-device-detect';
import type { Post } from 'contentlayer/generated';

interface IProps {
    data: Post;
    className?: string;
    onClick?: () => void;
}

export default function Post(props: IProps) {
    const { data, className, onClick } = props;
    const { title, description, authors, date } = data;
    const imageSize = 128; //window.innerWidth < 768 ? 32 : window.innerWidth < 1024 ? 64 : isBrowser ? 128 : 128;
    return (
        <div
            className={`flex items-center gap-4 w-full rounded-2xl bg-white p-4 cursor-pointer ${className}`}
            onClick={onClick}
        >
            <Image alt="文章头图" src={'/bird0.svg'} width={imageSize} height={imageSize}></Image>
            <div className="flex flex-col justify-between w-full h-full">
                <div>
                    <h1 className="text-[#333] font-medium">{title}</h1>
                    <Paragraph className="[&.ant-typography]:text-[#888]" ellipsis={{ rows: 2 }}>
                        {description}
                    </Paragraph>
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
                    <li className="flex items-center gap-2 ">
                        <ClockCircleOutlined />
                        <a href="">{date.slice(0, 10)}</a>
                    </li>
                    {/* <li className="flex items-center gap-2">
                        <CommentOutlined />
                        <a href="">comment count</a>
                    </li> */}
                </div>
            </div>
        </div>
    );
}
