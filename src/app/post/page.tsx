import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';

export default function Home() {
    return (
        <Suspense>
            <div className="flex h-full flex-col items-center justify-between">
                <PostList></PostList>
            </div>
        </Suspense>
    );
}
