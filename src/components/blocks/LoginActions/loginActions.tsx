'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';

interface LoginActionsProps {
	email: string;
	password: string;
}

export default function LoginActions({ email, password }: LoginActionsProps) {
	const router = useRouter();
	const { login } = useAuth();

	const handleLogin = async () => {
		try {
			await login(email, password);
			alert('로그인 성공!');
			router.push('/');
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
