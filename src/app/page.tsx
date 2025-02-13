import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';
export default function Home() {
	return (
		<Suspense>
			<div className="flex items-center flex-col p-8">
				<div className="w-full flex flex-col items-center text-center">
					<img
						className="w-full h-32 object-cover rounded-md"
						src={'https://pic1.imgdb.cn/item/67ada71dd0e0a243d4fed276.webp'}
						alt="" />
					<img className="w-32 h-32 rounded-full -translate-y-16 shadow-md"
						src="https://pic1.imgdb.cn/item/67ada9bdd0e0a243d4fed3a3.jpg"
						alt="" />
					<p className="font-bold text-xl -translate-y-8 typing-20 w-0 max-w-min text-wrap break-words break-all">
						Hi👋，我是haimin。
					</p>
				</div>
			</div>
			<div className='flex flex-col gap-1 p-2'>
				<span className='px-2 font-bold text-[#91b0f9]'>近期更新:</span>
				<PostList size={3}></PostList>
			</div>
		</Suspense>
	);
}
