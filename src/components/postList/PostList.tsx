'use client';
import { allPosts, Post } from 'contentlayer/generated';
import { useRouter, useSearchParams } from 'next/navigation';
import PostItem from '../postItem/PostItem';
import { useEffect, useState } from 'react';

export default function PostList() {
    // console.log('ap', allPosts);
    // console.log('ad', allDocuments);
    const router = useRouter();
    const params = useSearchParams();

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (params.get('tag')) {
            const filterPosts = allPosts.filter((item) => {
                return item.tags?.find((subItem) => subItem === params.get('tag'));
            });
            setPosts(filterPosts);
        } else {
            setPosts(allPosts);
        }
    }, [params]);

    return (
        <div className="flex flex-col w-full gap-3 p-6 max-md:p-4">
            {posts.map((item, index) => (
                <PostItem
                    data={item}
                    key={index}
                    onClick={() => {
                        router.push(`/post/${index}`);
                    }}
                ></PostItem>
            ))}
        </div>
    );
}
