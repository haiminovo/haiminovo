import Footer from '@/components/footer/Footer';
import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';
export default function Home() {
    return (
        <Suspense>
            <div className="flex h-full flex-col items-center">
                <PostList></PostList>
            </div>
            <Footer></Footer>
        </Suspense>
    );
}
