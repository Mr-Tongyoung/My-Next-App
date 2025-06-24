// /components/blocks/PostItem/PostItem.tsx
'use client';

import { fetchBoards } from '@/services/board-service';
import type { Board } from '@/types/api/board';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface BoardListClientProps {
	boardList: Board[];
}

export default function BoardListClient({ boardList }: BoardListClientProps) {
	const params = useParams<{
		boards: [];
	}>();
	const [boards, setBoards] = useState<Board[] | null>([]);

	useEffect(() => {
		fetchBoards()
			.then((data) => {
				setBoards(data);
			})
			.catch((err) => {
				console.error('게시글 불러오기 실패:', err);
			});
	}, [params.boards]);
	// 위 작성

	console.log('클라이언트 컴포넌트 BoardListClient:');

	return (
		<div className="container mx-auto text-center p-5">
			<ul className="space-y-4">
				{boards?.map((board) => (
					<li key={board._id} className="border rounded p-4 shadow">
						<h3 className="text-left text-lg font-semibold">
							<Link
								href={`/boards/${board._id}`}
								className="text-blue-600 hover:underline"
							>
								{board.title}
							</Link>
						</h3>
						{/* <p>{board.content}</p> */}
						{/* <p>{board.id}</p> */}
					</li>
				))}
			</ul>
		</div>
	);
}
