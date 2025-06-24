'use client';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from 'react-bootstrap/Button';

export default function MyNavbar() {
	const router = useRouter();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		fetch('http://localhost:3001/users/me', {
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((data) => {
				setIsLoggedIn(data.isLoggedIn);
			})
			.catch(() => {
				setIsLoggedIn(false);
			});
	}, []);

	const handleLogout = async () => {
		try {
			const res = await fetch('http://localhost:3001/users/logout', {
				method: 'POST',
				credentials: 'include',
			});
			if (!res.ok) throw new Error('로그아웃 실패');
			alert('로그아웃 되었습니다.');
			setIsLoggedIn(false);
			window.location.href = '/';
		} catch (err) {
			console.error(err);
			alert('로그아웃 중 오류 발생');
		}
	};

	return (
		<Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="/">프로젝트</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} href="/">
							Home
						</Nav.Link>
						<Nav.Link as={Link} href="/portfolio">
							Portfolio
						</Nav.Link>
						<Nav.Link as={Link} href="/posts">
							Posts
						</Nav.Link>
						<Nav.Link as={Link} href="/boards">
							게시글
						</Nav.Link>
					</Nav>
					<Nav>
						{isLoggedIn ? (
							<Button variant="outline-danger" onClick={handleLogout}>
								Logout
							</Button>
						) : (
							<>
								<Nav.Link as={Link} href="/login">
									Login
								</Nav.Link>
								<Nav.Link as={Link} href="/register">
									Register
								</Nav.Link>
							</>
						)}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
}
