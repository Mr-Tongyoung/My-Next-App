// /components/blocks/PostItem/PostItem.tsx
'use client';

import type { Board } from '@/types/api/board';
import Link from 'next/link';

interface BoardListClientProps {
	boardList: Board[];
}

export default function BoardListClient({ boardList }: BoardListClientProps) {
	console.log('클라이언트 컴포넌트 BoardListClient:');

	return (
		<div className="container mx-auto text-center p-5">
			<ul className="space-y-4">
				{boardList?.map((board) => (
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
