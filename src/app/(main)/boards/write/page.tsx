'use client';
import { useState } from 'react';
import { redirect, useRouter } from 'next/navigation';
import { Button, Form, InputGroup } from 'react-bootstrap';

export default function BoardWritePage() {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const router = useRouter(); // ✅ Next.js 라우터 객체

	const handleSubmit = async () => {
		try {
			const res = await fetch('http://localhost:3001/board', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					title,
					content,
				}),
			});

			if (!res.ok) {
				throw new Error('게시글 작성 실패');
			}

			const result = await res.json();
			console.log('작성 성공:', result);
			alert('게시글이 성공적으로 작성되었습니다!');
			// router.push('/boards');
			// redirect('/boards');
			router.replace('/boards');
		} catch (err) {
			console.error(err);
			alert('작성 중 오류 발생');
		}
	};

	return (
		<div className="p-5">
			<h1 className="text-3xl font-bold mb-4">게시글 작성</h1>

			<InputGroup className="mb-3">
				<InputGroup.Text id="title">title</InputGroup.Text>
				<Form.Control
					placeholder="제목을 입력하세요"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</InputGroup>

			<InputGroup>
				<InputGroup.Text id="content">Content</InputGroup.Text>
				<Form.Control
					as="textarea"
					rows={9}
					placeholder="내용을 입력하세요"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</InputGroup>

			<div className="text-end mt-2">
				<Button variant="primary" onClick={handleSubmit}>
					작성
				</Button>
			</div>
		</div>
	);
}
