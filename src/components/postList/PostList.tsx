'use client';
import { allPosts, allDocuments } from 'contentlayer/generated';
import { useRouter } from 'next/navigation';
import Post from '../post/Post';

export default function PostList() {
    console.log('ap', allPosts);
    console.log('ad', allDocuments);

    const router = useRouter();
    return (
        <div className="flex flex-col w-full gap-3">
            {allPosts.map((item, index) => (
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
