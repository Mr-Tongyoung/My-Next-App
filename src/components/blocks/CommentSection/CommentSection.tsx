'use client';

import { useState } from 'react';
import CommentForm from '../CommentForm/CommentForm';
import CommentList from '../CommentList/CommentList';

interface CommentSectionProps {
	postId: string;
	postAuthor?: string;
}

export default function CommentSection({
	postId,
	postAuthor,
}: CommentSectionProps) {
	const [refreshTrigger, setRefreshTrigger] = useState(0);

	const handleCommentAdded = () => {
		setRefreshTrigger((prev) => prev + 1);
	};

	return (
		<div className="comment-section mt-4">
			<h4 className="mb-3">댓글</h4>
			<CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
			<CommentList
				key={refreshTrigger}
				postId={postId}
				postAuthor={postAuthor}
			/>
		</div>
	);
}
