'use client';
import { allPosts, Post } from 'contentlayer/generated';
import { useRouter, useSearchParams } from 'next/navigation';
import PostItem from '../postItem/PostItem';
import { useEffect, useState } from 'react';

export default function PostList() {
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
		<div className="flex w-full flex-col gap-4">
			{posts.map((item, index) => (
				<PostItem
					index={index}
					data={item}
					key={index}
					onClick={() => {
						router.push(`/post/${item.slugAsParams}`);
					}}
				></PostItem>
			))}
		</div>
	);
}
