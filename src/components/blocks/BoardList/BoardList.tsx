// import { useEffect } from 'react';
import BoardListClient from './BoardList.client';
import { fetchBoards } from '@/services/board-service';

import { Board } from '@/types/api/board';

export default async function BoardList() {
	console.log('서버컴포넌트!  BoardList');

	const boardList = await fetchBoards();

	return <BoardListClient boardList={boardList} />;
}
