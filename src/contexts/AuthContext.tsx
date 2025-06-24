'use client';

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from 'react';

interface AuthContextType {
	isLoggedIn: boolean;
	user: any | null;
	login: (email: string, password: string) => Promise<void>;
	logout: () => Promise<void>;
	checkAuthStatus: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [user, setUser] = useState<any | null>(null);

	const checkAuthStatus = async () => {
		try {
			const res = await fetch('http://localhost:3001/users/me', {
				credentials: 'include',
			});
			const data = await res.json();

			if (data.isLoggedIn) {
				setIsLoggedIn(true);
				setUser(data.user || null);
			} else {
				setIsLoggedIn(false);
				setUser(null);
			}
		} catch (error) {
			console.error('Auth status check failed:', error);
			setIsLoggedIn(false);
			setUser(null);
		}
	};

	const login = async (email: string, password: string) => {
		try {
			const res = await fetch('http://localhost:3001/users/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
				credentials: 'include',
			});

			if (!res.ok) throw new Error('로그인 실패');

			// 로그인 성공 후 사용자 정보 다시 가져오기
			await checkAuthStatus();
		} catch (error) {
			console.error('Login failed:', error);
			throw error;
		}
	};

	const logout = async () => {
		try {
			const res = await fetch('http://localhost:3001/users/logout', {
				method: 'POST',
				credentials: 'include',
			});

			if (!res.ok) throw new Error('로그아웃 실패');

			setIsLoggedIn(false);
			setUser(null);
		} catch (error) {
			console.error('Logout failed:', error);
			throw error;
		}
	};

	useEffect(() => {
		checkAuthStatus();
	}, []);

	const value = {
		isLoggedIn,
		user,
		login,
		logout,
		checkAuthStatus,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
}
