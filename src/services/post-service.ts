// /services/post-service.ts
import type { Post } from '@/types/api/post';
export async function fetchPosts(): Promise<Post[]> {
	const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
	const data = await res.json();
	return data;
}
export async function fetchPost(postId: string): Promise<Post> {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${postId}`
	);
	const data = await res.json();
	return data;
}
