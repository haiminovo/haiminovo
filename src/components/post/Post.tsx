'use client';
import { Typography } from 'antd';
const { Paragraph } = Typography;
import Image from 'next/image';
import { ClockCircleOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons';

interface IProps {
    className?: string;
    onClick?: () => void;
}

export default function Post(props: IProps) {
    const { className, onClick } = props;
    return (
        <div className={`flex gap-1 w-full rounded-2xl bg-white ${className}`} onClick={onClick}>
            <Image alt="用户头像" src={'/bird0.svg'} width={128} height={128}></Image>
            <div className=" p-4  gap-4">
                <h1>placeholder</h1>
                <Paragraph ellipsis={{ rows: 2 }}>
                    here is a long description of each post and it should be cuted while the word is too long. here is a
                    long description of each post and it should be cuted while the word is too long. here is a long
                    description of each post and it should be cuted while the word is too long.
                </Paragraph>
                <div className="flex gap-8 bg-[#F5F9F6] p-1 rounded-md">
                    <li className="flex items-center gap-2 pl-3">
                        <UserOutlined />
                        <a href="">author</a>
                    </li>
                    <li className="flex items-center gap-2 ">
                        <ClockCircleOutlined />
                        <a href="">post time</a>
                    </li>
                    <li className="flex items-center gap-2">
                        <CommentOutlined />
                        <a href="">comment count</a>
                    </li>
                </div>
            </div>
        </div>
    );
}
