'use client';
import BoardList from '@/components/blocks/BoardList';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';

export default function BoardsPage() {
	const { isLoggedIn } = useAuth();

	return (
		<div className="container mx-auto text-center p-8">
			<h1 className="text-3xl font-bold mb-4">게시글 목록</h1>
			{isLoggedIn && (
				<Link href="/boards/write" passHref>
					<Button>게시글 작성</Button>
				</Link>
			)}
			<BoardList boardList={[]} />
		</div>
	);
}
