'use client';

import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
	fetchComments,
	updateComment,
	deleteComment,
} from '@/services/comment-service';
import { Comment } from '@/types/api/comment';
import { useAuth } from '@/contexts/AuthContext';

interface CommentListProps {
	postId: string;
	postAuthor?: string;
}

export default function CommentList({ postId, postAuthor }: CommentListProps) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editContent, setEditContent] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useAuth();

	const loadComments = async () => {
		setIsLoading(true);
		try {
			const fetchedComments = await fetchComments(postId);
			setComments(fetchedComments);
		} catch (error) {
			console.error('댓글 로드 오류:', error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		loadComments();
	}, [postId]);

	const handleEdit = (comment: Comment) => {
		setEditingId(comment._id);
		setEditContent(comment.content);
	};

	const handleUpdate = async () => {
		if (!editingId || !editContent.trim()) return;

		try {
			await updateComment(editingId, editContent.trim());
			setEditingId(null);
			setEditContent('');
			loadComments();
		} catch (error) {
			console.error('댓글 수정 오류:', error);
			alert('댓글 수정에 실패했습니다.');
		}
	};

	const handleDelete = async (commentId: string) => {
		if (!confirm('댓글을 삭제하시겠습니까?')) return;

		try {
			await deleteComment(commentId);
			loadComments();
		} catch (error) {
			console.error('댓글 삭제 오류:', error);
			alert('댓글 삭제에 실패했습니다.');
		}
	};

	const formatDate = (dateString: string | undefined) => {
		if (!dateString) return '';
		return new Date(dateString).toLocaleString('ko-KR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	if (isLoading) {
		return <div className="text-center p-3">댓글을 불러오는 중...</div>;
	}

	if (comments.length === 0) {
		return (
			<div className="text-center p-3 text-muted">아직 댓글이 없습니다.</div>
		);
	}

	return (
		<div className="comment-list">
			{comments.map((comment) => (
				<div
					key={comment._id}
					className="comment-item mb-3 p-3 border rounded"
					style={{ position: 'relative', paddingRight: '100px' }}
				>
					{user &&
						(user.email === comment.writer ||
							user.username === comment.writer) && (
							<div
								className="comment-actions"
								style={{
									position: 'absolute',
									top: 12,
									right: 16,
									display: 'flex',
									gap: '0.5rem',
								}}
							>
								{editingId !== comment._id && (
									<Button
										size="sm"
										variant="outline-primary"
										onClick={() => handleEdit(comment)}
										className="me-1"
									>
										수정
									</Button>
								)}
								<Button
									size="sm"
									variant="outline-danger"
									onClick={() => handleDelete(comment._id)}
								>
									삭제
								</Button>
							</div>
						)}
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						{editingId === comment._id ? (
							<div className="mb-2">
								<Form.Control
									as="textarea"
									rows={2}
									value={editContent}
									onChange={(e) => setEditContent(e.target.value)}
								/>
								<div
									className="mt-2"
									style={{
										display: 'flex',
										justifyContent: 'flex-end',
										gap: '0.5rem',
									}}
								>
									<Button
										size="sm"
										variant="primary"
										onClick={handleUpdate}
										className="me-2"
									>
										저장
									</Button>
									<Button
										size="sm"
										variant="secondary"
										onClick={() => {
											setEditingId(null);
											setEditContent('');
										}}
									>
										취소
									</Button>
								</div>
							</div>
						) : (
							<div className="comment-content">
								<p className="mb-2">{comment.content}</p>
							</div>
						)}
						<div className="comment-meta">
							<span
								className={`comment-author ${
									comment.writer === postAuthor ? 'text-muted' : ''
								}`}
							>
								{comment.writer}
								{comment.writer === postAuthor && (
									<span className="ms-1 badge bg-secondary">작성자</span>
								)}
							</span>
							<div className="comment-dates text-muted small">
								<span>작성: {formatDate(comment.createdAt)}</span>
								{comment.updatedAt &&
									comment.updatedAt !== comment.createdAt && (
										<span className="ms-2">
											수정: {formatDate(comment.updatedAt)}
										</span>
									)}
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
