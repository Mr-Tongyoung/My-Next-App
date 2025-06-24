import PostList from '@/components/blocks/PostList';

export default function PostListPage() {
	// 서버에서만 실행됩니다. ==> 서버 컴포넌트
	// 브라우저에서 동작하는 코드는 이곳에 작성할 수 없습니다.
	console.log('PostListPage 렌더링!');

	return (
		<div>
			<PostList />
		</div>
	);
}
