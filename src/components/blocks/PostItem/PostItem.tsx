import PostItemClient from './PostItem.client';

export default function PostItem({ postId }: { postId: string }) {
	return <PostItemClient postId={postId} />;
}
