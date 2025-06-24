import BoardList from '@/components/blocks/BoardList';
import BoardPageClient from './BoardPageClient';

export default function BoardsPage() {
	return (
		<div className="container mx-auto text-center p-8">
			<h1 className="text-3xl font-bold mb-4">게시글 목록</h1>
			<BoardPageClient />
			<BoardList />
		</div>
	);
}
