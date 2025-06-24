export interface Comment {
	_id: string;
	writer: string;
	board: string;
	content: string;
	createdAt?: string;
	updatedAt?: string;
}

export interface CreateCommentRequest {
	writer: string;
	content: string;
}

export interface UpdateCommentRequest {
	writer: string;
	content: string;
}
