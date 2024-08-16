import PostList from '@/components/postList/PostList';
import { Metadata } from 'next';
import { Suspense } from 'react';
export const metadata: Metadata = {
	title: '文章列表|巅峰之路',
	description: '这里是本站的文章列表',
	keywords: ['haimin', 'haiminovo', 'road to top', 'road to the top', '巅峰之路', '巅峰路', '前端'],
};
export default function Home() {
	return (
		<Suspense>
			<div className="flex h-full flex-col items-center p-6 max-md:p-4">
				<PostList></PostList>
			</div>
		</Suspense>
	);
}
