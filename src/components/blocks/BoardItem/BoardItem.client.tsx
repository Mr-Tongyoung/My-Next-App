'use client';

import { fetchBoard } from '@/services/board-service';
import type { Board } from '@/types/api/board';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BoardItemClientProps {
	boradId: string;
}

export default function BoardItemClient({
	boradId: boardId,
}: BoardItemClientProps) {
	const params = useParams<{
		boardId: string;
	}>();

	const [board, setBoard] = useState<Board | null>(null);

	useEffect(() => {
		fetchBoard(params.boardId).then((data) => {
			setBoard(data);
		});
	}, [params.boardId]);
	// 위 작성

	console.log('클라이언트 컴포넌트 BoardItemClient:', params);

	return (
		<div className="container mx-auto p-5">
			<div className="max-w-2xl mx-auto space-y-6">
				<div className="border rounded-lg p-4 shadow">
					<h2 className="text-lg font-semibold mb-2">{board?.title}</h2>
					<p className="text-left text-gray-800 whitespace-pre-line">
						{board?.content}
					</p>
					<div className="text-left mt-4 text-sm text-gray-500">
						<p>
							작성자: {board?.author}
							<br />
						</p>
						<p>updatedAt: {board?.updatedAt}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
