import type { Post } from 'contentlayer/generated';

type DatedPost = Pick<Post, 'date'>;

export function sortPostsByDateDesc<T extends DatedPost>(posts: T[]): T[] {
	return [...posts].sort((prev, next) => new Date(next.date).getTime() - new Date(prev.date).getTime());
}

export function getRecentPosts<T extends DatedPost>(posts: T[], size: number): T[] {
	return sortPostsByDateDesc(posts).slice(0, size);
}
