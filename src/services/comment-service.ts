import {
	Comment,
	CreateCommentRequest,
	UpdateCommentRequest,
} from '@/types/api/comment';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

// 게시글의 댓글 목록 가져오기
export const fetchComments = async (postId: string): Promise<Comment[]> => {
	try {
		const response = await fetch(`${API_BASE_URL}/comment/${postId}`, {
			credentials: 'include',
		});
		if (!response.ok) {
			throw new Error('댓글을 불러오는데 실패했습니다.');
		}
		return await response.json();
	} catch (error) {
		console.error('댓글 조회 오류:', error);
		throw error;
	}
};

// 댓글 작성
export const createComment = async (commentData: {
	postId: string;
	content: string;
	writer: string;
}): Promise<Comment> => {
	try {
		const response = await fetch(
			`${API_BASE_URL}/comment/${commentData.postId}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include',
				body: JSON.stringify({
					writer: commentData.writer,
					content: commentData.content,
				}),
			}
		);
		if (!response.ok) {
			throw new Error('댓글 작성에 실패했습니다.');
		}
		return await response.json();
	} catch (error) {
		console.error('댓글 작성 오류:', error);
		throw error;
	}
};

// 댓글 수정
export const updateComment = async (
	commentId: string,
	content: string
): Promise<Comment> => {
	try {
		const response = await fetch(`${API_BASE_URL}/comment/${commentId}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify({ content }),
		});
		if (!response.ok) {
			throw new Error('댓글 수정에 실패했습니다.');
		}
		return await response.json();
	} catch (error) {
		console.error('댓글 수정 오류:', error);
		throw error;
	}
};

// 댓글 삭제
export const deleteComment = async (commentId: string): Promise<void> => {
	try {
		const response = await fetch(`${API_BASE_URL}/comment/${commentId}`, {
			method: 'DELETE',
			credentials: 'include',
		});
		if (!response.ok) {
			throw new Error('댓글 삭제에 실패했습니다.');
		}
	} catch (error) {
		console.error('댓글 삭제 오류:', error);
		throw error;
	}
};
