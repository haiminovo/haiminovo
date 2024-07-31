'use client';
import { allPosts } from 'contentlayer/generated';
import { useRouter } from 'next/navigation';
import Post from '../post/Post';

export default function PostList() {
    const router = useRouter();
    const posts = allPosts;
    return (
        <div className="flex flex-col w-full gap-3">
            {posts.map((item, index) => (
                <Post
                    data={item}
                    key={index}
                    onClick={() => {
                        router.push(`/post/${index}`);
                    }}
                ></Post>
            ))}
        </div>
    );
}
