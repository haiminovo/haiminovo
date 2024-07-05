'use client';
import { Typography } from 'antd';
const { Paragraph } = Typography;
import Image from 'next/image';
import { ClockCircleOutlined, CommentOutlined, UserOutlined } from '@ant-design/icons';
import { isMobile, isTablet, isBrowser } from 'react-device-detect';

interface IProps {
    className?: string;
    onClick?: () => void;
}

export default function Post(props: IProps) {
    const { className, onClick } = props;
    const imageSize = window.innerWidth < 768 ? 32 : window.innerWidth < 1024 ? 64 : isBrowser ? 128 : 128;
    return (
        <div
            className={`flex justify-center items-center gap-4 w-full rounded-2xl bg-white p-4 ${className}`}
            onClick={onClick}
        >
            <Image alt="用户头像" src={'/bird0.svg'} width={imageSize} height={imageSize}></Image>
            <div className=" gap-4">
                <h1 className="text-[#333] font-medium">placeholder</h1>
                <Paragraph className="[&.ant-typography]:text-[#888]" ellipsis={{ rows: 2 }}>
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
