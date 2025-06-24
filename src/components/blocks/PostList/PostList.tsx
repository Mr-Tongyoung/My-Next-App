// import { useEffect } from 'react';
import PostListClient from './PostList.client';

export default function PostList() {
	// 오직 서버에서만 실행됩니다.
	// 브라우저에서 실행되는 코드는 이 곳에 작성할 수 없습니다.
	console.log('PostList 서버컴포넌트!');

	// useEffect(() => {
	// 	// 서버컴포넌트에서는 사용 불가.
	// 	console.log('useEffect on Server');
	// });

	return <PostListClient />;
}
