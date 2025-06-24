import AlbumItemClient from '@/components/blocks/AlbumItem/AlbumItem.client';

type ServerAlbumsDetailPageProps = {
	params: Promise<{
		albumId: string;
	}>;
};
type Album = {
	title: string;
	id: number;
};

export default async function ServerAlbumsDetailPage({
	params,
}: ServerAlbumsDetailPageProps) {
	// URL Parameter 전달받는 2가지 방법.
	// 1. props.params로 전달받기 (서버 컴포넌트)
	// 2. useParams 훅 사용 (클라이언트 컴포넌트)

	const { albumId } = await params;

	const resp = await fetch(
		`https://jsonplaceholder.typicode.com/albums/${albumId}`
	);
	const album: Album = await resp.json();

	return (
		<div>
			<AlbumItemClient album={album} />
			{/* <button className="bg-amber-300 p-3 rounded-2xl cursor-pointer">
        클릭
      </button>
      <p>앨범 제목: {album.title}</p> */}
		</div>
	);
}

export async function generateStaticParams() {
	const resp = await fetch(`https://jsonplaceholder.typicode.com/albums`);
	const data = await resp.json();
	return data.map((album: Album) => {
		return {
			albumId: album.id.toString(),
		};
	});
}
