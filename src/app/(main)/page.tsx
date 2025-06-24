import type { Metadata } from 'next';
import Image from 'next/image';

// next.js의 rule: metadata란 변수가 export되면, next.js가 읽어서 적용시키는구나.

export const metadata: Metadata = {
	title: '첫 페이지!',
	description: '저의 첫번째 Next.js 페이지입니다.',
};

export default function Home() {
	return (
		<div className="flex justify-center text-center">
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold underline">안녕하세요.</h1>
				<div>첫번째 페이지를 만들었습니다.</div>

				<Image src="/pizza.jpg" alt="책 이미지" width={200} height={200} />

				<button className="my-btn">버튼</button>
			</div>
		</div>
	);
}
