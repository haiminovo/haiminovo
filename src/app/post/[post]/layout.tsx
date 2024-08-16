import { CopyrightOutlined, LikeOutlined, PayCircleOutlined } from '@ant-design/icons';
import { Inter } from 'next/font/google';
import Comment from '@/components/comment/Comment';
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
					<div className="flex justify-end py-8 text-xs">
						<div className="flex items-center gap-1">
							<CopyrightOutlined />
							<span>允许规范转载</span>
						</div>
					</div>
					{/* <div className="flex justify-center items-center gap-12 w-full text-sm">
                        <button className="flex items-center gap-1 py-1 px-2 rounded-xl text-font-normal-dark bg-gradient-to-tr from-[rgb(203,158,73,.9)] to-[rgba(255,225,128,.9)]">
                            <PayCircleOutlined />
                            打赏
                        </button>
                        <button className="flex items-center gap-1 py-1 px-2 rounded-xl text-font-normal-dark bg-gradient-to-tr from-[rgba(243,113,113,.9)] to-[rgba(255,168,168,.9)]">
                            <LikeOutlined />
                            点赞
                        </button>
                    </div> */}
					{/* <Comment></Comment> */}
				</div>
			</div>
		</>
	);
}
