'use client';
import React from 'react';
import Image from 'next/image';
import { Typography } from 'antd';
import Reply from '../reply/Reply';
const { Paragraph } = Typography;
interface IProps {
    className?: string;
}
// 评论
export default function Comment(props: IProps) {
    const { className } = props;
    return (
        <div className={`flex flex-col gap-2  ${className}`}>
            <div className="flex items-start">
                <Image className=" rounded-2xl" alt="用户头像" src={'/bird1.svg'} width={64} height={64}></Image>
                <div className="flex flex-col gap-2 p-2 text-sm">
                    <span className=" text-base font-bold text-[#333]">匿名用户</span>
                    <span className="text-xs">2024/07/02</span>
                    <Paragraph className="p-2 indent-4 break-all">
                        我说 here is a long description of each post and it should not be cuted while the word is too
                        long. here is a long description of each post and it should not be cuted while the word is too
                        long. here is a long description of each post and it should not be cuted while the word is too
                        long.
                    </Paragraph>
                </div>
            </div>
            <div className="flex justify-end w-full px-6 text-sm">
                <button className="text-[#3d82ac]">回复</button>
            </div>
        </div>
    );
}
