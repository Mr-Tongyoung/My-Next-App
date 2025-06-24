'use client';
import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import Button from 'react-bootstrap/Button';

export default function MyNavbar() {
	const { isLoggedIn, logout } = useAuth();

	const handleLogout = async () => {
		try {
			await logout();
			alert('로그아웃 되었습니다.');
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
