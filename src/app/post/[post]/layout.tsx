import { CopyrightOutlined, EyeOutlined, LikeOutlined, LoadingOutlined, PayCircleOutlined } from '@ant-design/icons';
import Script from 'next/dist/client/script';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });

export default function PostLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className={`${inter.className} flex flex-col gap-4`}>
                <div className="flex flex-col p-6">
                    {children}
                    <div className="flex justify-end text-xs py-8">
                        <div className="flex gap-1 items-center">
                            <CopyrightOutlined />
                            <span>允许规范转载</span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-12 w-full text-sm">
                        <button className="flex items-center gap-1 py-1 px-2 rounded-xl text-font-normal-dark bg-gradient-to-tr from-[rgb(203,158,73,.9)] to-[rgba(255,225,128,.9)]">
                            <PayCircleOutlined />
                            打赏
                        </button>
                        <button className="flex items-center gap-1 py-1 px-2 rounded-xl text-font-normal-dark bg-gradient-to-tr from-[rgba(243,113,113,.9)] to-[rgba(255,168,168,.9)]">
                            <LikeOutlined />
                            点赞
                        </button>
                    </div>
                </div>
                {/* <Comment></Comment> */}
            </div>
        </>
    );
}
