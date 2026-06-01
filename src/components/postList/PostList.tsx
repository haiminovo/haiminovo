'use client';
import { allPosts, Post } from 'contentlayer/generated';
import { useSearchParams } from 'next/navigation';
import PostItem from '../postItem/PostItem';
import { useMemo } from 'react';
import { sortPostsByDateDesc } from '@/lib/posts';

interface IProps {
	size?: number;
}

export default function PostList({ size = -1 }: IProps) {
	const params = useSearchParams();
	const tag = params.get('tag');
	const posts = useMemo<Post[]>(() => {
		const matchedPosts = tag ? allPosts.filter((item) => item.tags?.includes(tag)) : allPosts;
		const sortedPosts = sortPostsByDateDesc(matchedPosts);

		if (tag) {
			return sortedPosts;
		}

		return size > 0 ? sortedPosts.slice(0, size) : sortedPosts;
	}, [size, tag]);

	return (
		<div className="flex w-full flex-col gap-4">
			{posts.map((item, index) => (
				<PostItem index={index} data={item} key={item.slugAsParams}></PostItem>
			))}
		</div>
	);
}
