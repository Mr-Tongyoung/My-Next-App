'use client';

import LoginActions from '@/components/blocks/LoginActions/loginActions';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

export default function RegisterPage() {
	const [userId, setUserId] = useState('');
	const [password, setPassword] = useState('');

	return (
		<div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
			<h1 className="text-2xl font-bold text-center mb-6">로그인</h1>

			{/* 아이디 입력 */}
			<Form.Group className="mb-3" controlId="formUserId">
				<Form.Label>아이디</Form.Label>
				<Form.Control
					type="text"
					placeholder="아이디를 입력하세요"
					value={userId}
					onChange={(e) => setUserId(e.target.value)}
				/>
			</Form.Group>

			{/* 비밀번호 입력 */}
			<Form.Group className="mb-3" controlId="formPassword">
				<Form.Label>비밀번호</Form.Label>
				<Form.Control
					type="password"
					placeholder="비밀번호를 입력하세요"
					// value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</Form.Group>

			<div>
				<LoginActions email={userId} password={password} />
			</div>
		</div>
	);
}
