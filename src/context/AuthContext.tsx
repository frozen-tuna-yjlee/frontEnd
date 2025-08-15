import React, { createContext, useContext, useMemo, useState } from 'react';
import axios from 'axios';
import axiosInstance from '../services/axios';

export type User = {
  name: string;
  email: string;
  avatarUrl?: string;
};

type AuthContextValue = {
  user: User | null;
  login: (userId: string, userPw: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (userId: string, userPw: string, rememberMe: boolean) => {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      user_id: userId,
      user_pw: userPw,
      rememberMe,
    });

    const result = response?.data ?? {};
    const token: string | undefined = result.data.accessToken;
    const responseUser = (result.data.user ?? null) as User | null;

    if (token) {
      localStorage.setItem('accessToken', token);
    }

    // Fallback if API doesn't return user info
    const resolvedUser: User = responseUser ?? {
      name: userId,
      email: result.data.email ?? `${userId}@example.com`,
      avatarUrl: undefined,
    };

    setUser(resolvedUser);
  };

  const refreshToken = async () => {
    const response = await axiosInstance.post('/api/auth/refresh');

    const result = response?.data ?? {};
    const token: string | undefined = result.data?.accessToken;
    const responseUser = (result.data?.user ?? null) as User | null;

    // Safely handle possible null for responseUser
    let resolvedUser: User;
    if (responseUser) {
      resolvedUser = {
        name: responseUser.name,
        email: responseUser.email ?? '',
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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  const value = useMemo(() => ({ user, login, logout, refreshToken}), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const tokenLoginCheck = async () => {
  const response = await axiosInstance.get('http://localhost:3000/api/auth/token-login-check');
  return response.data;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

