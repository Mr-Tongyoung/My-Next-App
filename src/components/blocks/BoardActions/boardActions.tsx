'use client';

import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';

interface BoardActionsProps {
	boardId: string;
}

export default function BoardActions({ boardId }: BoardActionsProps) {
	const router = useRouter();

	const handleDelete = async () => {
		if (!confirm('정말 삭제하시겠습니까?')) return;

		try {
			const res = await fetch(`http://localhost:3001/board/${boardId}`, {
				method: 'DELETE',
			});

			if (!res.ok) throw new Error('삭제 실패');

			alert('삭제되었습니다.');
			router.replace('/boards');
		} catch (error) {
			console.error(error);
			alert('삭제 중 오류 발생');
		}
	};

	const handleEdit = async () => {
		router.push(`/boards/write/${boardId}`);
	};

	return (
		<div className="text-end space-x-2 mt-4">
			<Button variant="primary" onClick={handleEdit}>
				수정
			</Button>
			<Button variant="danger" onClick={handleDelete}>
				삭제
			</Button>
		</div>
	);
}
