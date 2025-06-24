// /app/(main)/posts/[postId]/page.tsx

import BoardItem from '@/components/blocks/BoardItem';
import BoardActions from '@/components/blocks/BoardActions/boardActions';
import { fetchBoard, fetchBoards } from '@/services/board-service';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';

/**
 * 서버에서 URL Parameter 받아오기
 * ==> props로 받아온다.
 */
export interface BoardDetailPageProps {
	params: Promise<{
		boardId: string;
	}>;
}

export default async function BoardDetailPage({
	params,
}: BoardDetailPageProps) {
	const { boardId } = await params;
	console.log('서버 PostDetailPage 렌더링');
	console.log('서버 params.postId:', boardId);

	// 서버측에서 데이터 받아오기
	const board = await fetchBoard(boardId);

	return (
		<div className="container mx-auto text-center p-8">
			<h1 className="text-3xl font-bold underline">게시글 상세 페이지.</h1>
			<p className="mt-4 text-lg">여기는 게시글 상세 페이지입니다. </p>

			<div>
				<BoardItem boardId={boardId} />
				<BoardActions boardId={boardId} />
			</div>
		</div>
	);
}

export async function generateStaticParams() {
	const data = await fetchBoards();
	return data.map((board) => {
		return {
			postId: board._id.toString(),
		};
	});
}
