import Image from 'next/image';
import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';
export default function Home() {
	return (
		<Suspense>
			<div className="flex flex-col items-center p-8">
				<div className="flex w-full flex-col items-center text-center">
					<div className="relative h-32 w-full overflow-hidden rounded-md">
						<Image
							className="object-cover"
							src="https://pic1.imgdb.cn/item/67ada71dd0e0a243d4fed276.webp"
							alt="首页横幅"
							fill
							priority
							sizes="100vw"
						/>
					</div>
					<Image
						className="-translate-y-16 rounded-full shadow-md"
						src="https://pic1.imgdb.cn/item/67ada9bdd0e0a243d4fed3a3.jpg"
						alt="haimin 头像"
						width={128}
						height={128}
						priority
					/>
					<p className="typing-20 w-0 max-w-min -translate-y-8 text-xl font-bold text-wrap break-words break-all">
						Hi👋，我是haimin。
					</p>
				</div>
			</div>
			<div className="flex flex-col gap-1 p-2">
				<span className="px-2 font-bold text-[#91b0f9]">近期更新:</span>
				<PostList size={3}></PostList>
			</div>
		</Suspense>
	);
}
