import Banner from '@/components/banner/Banner';
import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';
export default function Home() {
	return (
		<Suspense>
			<div className="flex h-full flex-col gap-4 p-3 pt-8">
				<Banner></Banner>
				<div className="flex h-full flex-col items-center">
					<PostList></PostList>
				</div>
			</div>
		</Suspense>
	);
}
