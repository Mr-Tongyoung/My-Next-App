'use client';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';

export default function BoardPageClient() {
	const { isLoggedIn } = useAuth();

	return (
		<>
			{isLoggedIn && (
				<Link href="/boards/write" passHref>
					<Button>게시글 작성</Button>
				</Link>
			)}
		</>
	);
}
