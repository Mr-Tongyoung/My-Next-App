type Album = {
	userId: number;
	id: number;
	title: string;
};

export default async function ServerAlbumsPage() {
	const resp = await fetch('https://jsonplaceholder.typicode.com/albums');
	const albumList: Album[] = await resp.json();

	return (
		<div>
			<h1 className="text-5xl font-bold">Server 앨범리스트</h1>

			<ul>
				{albumList.map((album) => {
					return <li key={album.id}>{album.title}</li>;
				})}
			</ul>
		</div>
	);
}

// 참조 URL: https://jsonplaceholder.typicode.com/albums

// URL “localhost:3000/client-albums” 로 접속을 하면 위 URL에 대한 album리스트(제목만)가 보여지도록 해주세요. (ul > li 태그 사용)
// 단, 클라이언트에서 요청을 보내야 합니다. (순수 React - React의 useState, useEffect 사용)
