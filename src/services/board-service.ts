// /services/board-service.ts
import type { Board } from '@/types/api/board';
export async function fetchBoards(): Promise<Board[]> {
	const res = await fetch(`http://localhost:3001/board`);
	const data = await res.json();
	return data;
}
export async function fetchBoard(boardId: string): Promise<Board> {
	const res = await fetch(`http://localhost:3001/board/${boardId}`);
	const data = await res.json();
	return data;
}
