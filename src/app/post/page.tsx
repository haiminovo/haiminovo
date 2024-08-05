import PostList from '@/components/postList/PostList';

export default function Home() {
    return (
        <div className="flex h-full flex-col items-center justify-between">
            <PostList></PostList>
        </div>
    );
}
