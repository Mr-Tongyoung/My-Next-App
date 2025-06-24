'use client';

import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';

interface LoginActionsProps {
	email: string;
	password: string;
}

export default function LoginActions({ email, password }: LoginActionsProps) {
	const router = useRouter();

	const handleLogin = async () => {
		try {
			const res = await fetch(`http://localhost:3001/users/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
				credentials: 'include',
			});

			if (!res.ok) throw new Error('로그인 실패');

			alert('로그인 성공!');
			// router.replace('/');
			// window.location.reload();
			window.location.href = '/';
		} catch (error) {
			console.error(error);
			alert('로그인 중 오류 발생');
		}
	};

	return (
		<div className="text-end space-x-2 mt-4">
			<Button onClick={handleLogin}>로그인</Button>
		</div>
	);
}
