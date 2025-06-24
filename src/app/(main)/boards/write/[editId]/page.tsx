'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Form, InputGroup } from 'react-bootstrap';

interface BoardEditPageProps {
	params: {
		editId: string;
	};
}

export default function BoardEditPage({ params }: BoardEditPageProps) {
	const { editId } = params;
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const router = useRouter();

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
