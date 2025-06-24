export async function fetchAlbums() {
	const res = await fetch(`https://jsonplaceholder.typicode.com/albums`);
	const data = await res.json();
	return data;
}
export async function fetchAlbum(albumId: number) {
	const res = await fetch(
		`https://jsonplaceholder.typicode.com/albums/${albumId}`
	);
	const data = await res.json();
	return data;
}
