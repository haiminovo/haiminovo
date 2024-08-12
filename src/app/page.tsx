import Footer from '@/components/footer/Footer';
import PostList from '@/components/postList/PostList';
export default function Home() {
    return (
        <>
            <div className="flex h-full flex-col items-center">
                <PostList></PostList>
            </div>
            <Footer></Footer>
        </>
    );
}
