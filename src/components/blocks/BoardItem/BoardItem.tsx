import BoardItemClient from './BoardItem.client';

export default function BoardItem({ boardId }: { boardId: string }) {
	return <BoardItemClient boradId={boardId} />;
}
