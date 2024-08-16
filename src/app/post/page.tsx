import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';

export default function Home() {
	return (
		<Suspense>
			<div className="flex h-full flex-col items-center p-6 max-md:p-4">
				<PostList></PostList>
			</div>
		</Suspense>
	);
}
