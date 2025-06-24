// /app/(main)/posts/[postId]/page.tsx

import PostItem from '@/components/blocks/PostItem';
import { fetchPost, fetchPosts } from '@/services/post-service';

/**
 * 서버에서 URL Parameter 받아오기
 * ==> props로 받아온다.
 */
export interface PostDetailPageProps {
	params: Promise<{
		postId: string;
	}>;
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
	const { postId } = await params;
	console.log('서버 PostDetailPage 렌더링');
	console.log('서버 params.postId:', postId);

	// 서버측에서 데이터 받아오기
	const post = await fetchPost(postId);

	return (
		<div className="container mx-auto text-center p-8">
			<h1 className="text-3xl font-bold underline">게시글 상세 페이지.</h1>
			<p className="mt-4 text-lg">여기는 게시글 상세 페이지입니다. </p>

			<p>{post.title}</p>
			<div>
				<PostItem postId={postId} />
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	const data = await fetchPosts();
	return data.map((post) => {
		return {
			postId: post.id.toString(),
		};
	});
}
