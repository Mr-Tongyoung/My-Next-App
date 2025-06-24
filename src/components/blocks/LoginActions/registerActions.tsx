'use client';

import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';

interface LoginActionsProps {
	email: string;
	password: string;
}

export default function RegisterActions({
	email,
	password,
}: LoginActionsProps) {
	const router = useRouter();

	const handleRegister = async () => {
		try {
			const res = await fetch(`http://localhost:3001/users/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			if (!res.ok) throw new Error('회원가입 실패');

			alert('가입을 축하합니다!');
			router.replace('/');
		} catch (error) {
			console.error(error);
			alert('회원가입 중 오류 발생');
		}
	};

	return (
		<div className="text-end space-x-2 mt-4">
			<Button onClick={handleRegister}>가입하기</Button>
		</div>
	);
}
