'use client';
import React from 'react';
import Image from 'next/image';
import { Typography } from 'antd';
const { Paragraph } = Typography;
interface IProps {
    className?: string;
}
// 评论
export default function Reply(props: IProps) {
    const { className } = props;
    return (
        <div className={`flex flex-col gap-2  ${className}`}>
            <div className="flex items-start">
                <Image alt="用户头像" src={'/bird1.svg'} width={64} height={64}></Image>
                <div className="flex flex-col gap-2 p-2 text-sm">
                    <span>用户名</span>
                    <span>评论日期</span>
                    <Paragraph className="p-2">
                        here is a long description of each post and it should not be cuted while the word is too long.
                        here is a long description of each post and it should not be cuted while the word is too long.
                        here is a long description of each post and it should not be cuted while the word is too long.
                    </Paragraph>
                </div>
            </div>
            <div className="flex justify-end w-full py-6 text-sm">
                <button>回复</button>
            </div>
        </div>
    );
}
