'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { useAuth } from '@/contexts/AuthContext';

export default function BoardEditPage() {
	const params = useParams();
	const editId = params.editId as string;
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const router = useRouter();
	const { isLoggedIn } = useAuth();

	// 로그인하지 않은 경우 로그인 페이지로 리다이렉트
	useEffect(() => {
		if (!isLoggedIn) {
			alert('로그인이 필요한 서비스입니다.');
			router.push('/login');
		}
	}, [isLoggedIn, router]);

	useEffect(() => {
		// 기존 게시글 데이터 불러오기
		fetch(`http://localhost:3001/board/${editId}`)
			.then((res) => res.json())
			.then((data) => {
				setTitle(data.title);
				setContent(data.content);
			});
	}, [editId]);

	const handleUpdate = async () => {
		const res = await fetch(`http://localhost:3001/board/${editId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ title, content }),
		});

		if (!res.ok) {
			alert('수정 실패');
			return;
		}

		alert('수정 완료');
		router.push('/boards');
	};

	// 로그인하지 않은 경우 로딩 상태 표시
	if (!isLoggedIn) {
		return (
			<div className="p-5 text-center">
				<p>로그인 확인 중...</p>
			</div>
		);
	}

	return (
		<div className="p-5">
			<h1 className="text-3xl font-bold mb-4">게시글 수정</h1>

			<InputGroup className="mb-3">
				<InputGroup.Text>title</InputGroup.Text>
				<Form.Control
					placeholder="제목을 입력하세요"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</InputGroup>

			<InputGroup className="mb-3">
				<InputGroup.Text>content</InputGroup.Text>
				<Form.Control
					as="textarea"
					rows={10}
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</InputGroup>

			<div className="text-end">
				<Button variant="primary" onClick={handleUpdate}>
					수정
				</Button>
			</div>
		</div>
	);
}
