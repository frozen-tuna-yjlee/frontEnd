import React, { createContext, useContext, useMemo, useState } from 'react';
import axios from 'axios';

export type User = {
  name: string;
  email: string;
  avatarUrl?: string;
};

type AuthContextValue = {
  user: User | null;
  login: (userId: string, userPw: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
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

    const data = response?.data ?? {};
    const token: string | undefined = data.token;
    const responseUser = (data.user ?? null) as User | null;

    if (rememberMe && token) {
      localStorage.setItem('auth_token', token);
    }

    // Fallback if API doesn't return user info
    const resolvedUser: User = responseUser ?? {
      name: userId,
      email: data.email ?? `${userId}@example.com`,
      avatarUrl: undefined,
    };

    setUser(resolvedUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('auth_token');
  };

  const value = useMemo(() => ({ user, login, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

