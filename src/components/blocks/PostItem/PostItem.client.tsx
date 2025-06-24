// /components/blocks/PostItem/PostItem.tsx
'use client';

import { fetchPost } from '@/services/post-service';
import type { Post } from '@/types/api/post';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PostItemClientProps {
	postId: string;
}

export default function PostItemClient({ postId }: PostItemClientProps) {
	const params = useParams<{
		postId: string;
	}>();

	const [board, setBoard] = useState<Post | null>(null);

	useEffect(() => {
		fetchPost(params.postId).then((data) => {
			setBoard(data);
		});
	}, [params.postId]);
	// 위 작성

	console.log('클라이언트 컴포넌트 PostItemClient:', params);

	return (
		<div className="container mx-auto text-center p-5">
			<p>clientRendering :{board && board.title}</p> {/* 작성 */}
			<p>postId(ServerComponent에서 받아온 postId): {postId}</p>
			<p>postId(클라이언트에서 받아온 postId): {params.postId}</p>
		</div>
	);
}
