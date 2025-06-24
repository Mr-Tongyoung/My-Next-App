'use client';

import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createComment } from '@/services/comment-service';
import { useAuth } from '@/contexts/AuthContext';

interface CommentFormProps {
	postId: string;
	onCommentAdded: () => void;
}

export default function CommentForm({
	postId,
	onCommentAdded,
}: CommentFormProps) {
	const [content, setContent] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { user } = useAuth();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!content.trim() || !user) return;

		setIsSubmitting(true);
		try {
			await createComment({
				postId,
				content: content.trim(),
				writer: user.username || user.email || 'Anonymous',
			});
			setContent('');
			onCommentAdded();
		} catch (error) {
			console.error('댓글 작성 오류:', error);
			alert('댓글 작성에 실패했습니다.');
		} finally {
			setIsSubmitting(false);
		}
	};

	if (!user) {
		return (
			<div className="text-center p-3">
				<p className="text-muted">댓글을 작성하려면 로그인이 필요합니다.</p>
			</div>
		);
	}

	return (
		<Form onSubmit={handleSubmit} className="mb-4 comment-form">
			<Form.Group className="mb-3">
				<Form.Label>댓글 작성</Form.Label>
				<Form.Control
					as="textarea"
					rows={3}
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="댓글을 입력하세요..."
					required
				/>
			</Form.Group>
			<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<Button
					type="submit"
					variant="primary"
					disabled={isSubmitting || !content.trim()}
				>
					{isSubmitting ? '작성 중...' : '댓글 작성'}
				</Button>
			</div>
		</Form>
	);
}
