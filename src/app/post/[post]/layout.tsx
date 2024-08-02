import {
    ClockCircleOutlined,
    CopyrightOutlined,
    HomeOutlined,
    LikeOutlined,
    PayCircleOutlined,
} from '@ant-design/icons';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { twMerge } from 'tailwind-merge';
import Comment from '@/components/comment/Comment';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: '野猪巢穴',
    description: 'haimin的个人网站',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={`${inter.className} flex flex-col gap-4`}>
            <div className="bg-white rounded-lg p-6">
                {children}
                <li className="flex justify-between text-xs py-8">
                    <div className="flex gap-1 items-center">
                        <ClockCircleOutlined />
                        <span>最后更新时间: mock</span>
                    </div>
                    <div className="flex gap-1 items-center">
                        <CopyrightOutlined />
                        <span>允许规范转载</span>
                    </div>
                </li>
                <div className="flex justify-center items-center gap-12 w-full text-sm">
                    <button className="flex items-center gap-1 py-1 px-2 rounded-xl text-font-normal-dark bg-gradient-to-tr from-[rgba(203,158,73,1)] to-[rgba(255,225,128,1)]">
                        <PayCircleOutlined />
                        打赏
                    </button>
                    <button className="flex items-center gap-1 py-1 px-2 rounded-xl text-font-normal-dark bg-gradient-to-tr from-[rgba(243,113,113,1)] to-[rgba(255,168,168,1)]">
                        <LikeOutlined />
                        点赞
                    </button>
                </div>
            </div>
            <Comment></Comment>
        </div>
    );
}
