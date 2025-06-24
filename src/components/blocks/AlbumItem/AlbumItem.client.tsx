'use client';

import { useState } from 'react';

type Album = {
	title: string;
	id: number;
};

type AlbumItemClientProps = {
	album: Album;
};

export default function AlbumItemClient({ album }: AlbumItemClientProps) {
	const [isVisible, setIsVisible] = useState<boolean>(true);
	return (
		<div>
			<button
				className="bg-amber-300 p-3 rounded-2xl cursor-pointer"
				onClick={() => {
					setIsVisible((prev) => !prev);
				}}
			>
				클릭
			</button>
			<p>앨범 제목: {isVisible && album.title}</p>
		</div>
	);
}
