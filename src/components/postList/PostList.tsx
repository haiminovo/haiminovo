'use client';
import { allPosts, Post } from 'contentlayer/generated';
import { useSearchParams } from 'next/navigation';
import PostItem from '../postItem/PostItem';
import { useMemo } from 'react';

interface IProps {
	size?: number;
}

export default function PostList({ size = -1 }: IProps) {
	const params = useSearchParams();
	const tag = params.get('tag');
	const posts = useMemo<Post[]>(() => {
		if (tag) {
			return allPosts.filter((item) => item.tags?.includes(tag));
		}

		return size > 0 ? allPosts.slice(0, size) : allPosts;
	}, [size, tag]);

	return (
		<div className="flex w-full flex-col gap-4">
			{posts.map((item, index) => (
				<PostItem index={index} data={item} key={item.slugAsParams}></PostItem>
			))}
		</div>
	);
}
