import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import axiosInstance from '../services/axios';

export type User = {
  name: string;
  email: string;
  avatarUrl?: string;
};

export type UserResponseCheckToken = {
  user_nm: string;
  user_id: string;
  avatarUrl?: string;
  user_no: string;
  user_mail: string;
};


type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  login: (userId: string, userPw: string, rememberMe: boolean) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (userId: string, userPw: string, rememberMe: boolean) => {
    const response = await axiosInstance.post('/api/auth/login', {
      user_id: userId,
      user_pw: userPw,
      rememberMe,
    });

    const result = response?.data ?? {};

    const token: string | undefined = result.data.accessToken;

    if (token) {
      localStorage.setItem('accessToken', token);
    }
    
    const responseUser = (result.data ?? null) as UserResponseCheckToken | null;

    // Fallback if API doesn't return user info
    const resolvedUser: User = {
      name: responseUser?.user_nm ?? 'Unknown',
      email: responseUser?.user_mail ?? `${userId}@example.com`,
      avatarUrl: responseUser?.avatarUrl,
    };

    setUser(resolvedUser);
  };

  const refreshToken = async () => {
    const response = await axiosInstance.post('/api/auth/refresh');

    const result = response?.data ?? {};
    const responseUser = (result?.user ?? null) as UserResponseCheckToken | null;

    // Safely handle possible null for responseUser
    let resolvedUser: User;
    if (responseUser) {
      resolvedUser = {
        name: responseUser.user_nm,
        email: responseUser.user_mail ?? '',
        avatarUrl: responseUser.avatarUrl,
      };
    } else {
      resolvedUser = {
        name: 'Unknown',
        email: '',
        avatarUrl: undefined,
      };
    }

    setUser(resolvedUser);
  };

  const logout = async () => {
    try {
      // 서버에 로그아웃 요청 보내기
      await axiosInstance.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout request failed:', error);
      // 서버 요청이 실패해도 클라이언트에서는 로그아웃 처리
    } finally {
      // 클라이언트 상태 정리
      setUser(null);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('auth_token');
    }
  };

  // 토큰 확인 및 자동 로그인
  useEffect(() => {
    const checkTokenAndLogin = async () => {
      try {
         // 토큰이 있으면 refreshToken을 통해 사용자 정보 확인
        await refreshToken();
      } catch (error) {
        console.error('Token validation failed:', error);
        // 토큰이 유효하지 않으면 로그아웃 처리
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkTokenAndLogin();
  }, []);

  const value = useMemo(() => ({ user, isLoading, login, logout, refreshToken}), [user, isLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const tokenLoginCheck = async () => {
  const response = await axiosInstance.get('/api/auth/token-login-check');
  return response.data;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

