import Banner from '@/components/banner/Banner';
import Footer from '@/components/footer/Footer';
import PostList from '@/components/postList/PostList';
import { Suspense } from 'react';
export default function Home() {
    return (
        <Suspense>
            <div className="flex flex-col gap-4 h-full p-6 max-md:p-4">
                <Banner></Banner>
                <div className="flex h-full flex-col items-center">
                    <PostList></PostList>
                </div>
            </div>
            <Footer></Footer>
        </Suspense>
    );
}
