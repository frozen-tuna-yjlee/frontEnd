import React, { createContext, useContext, useMemo, useState, useEffect, useRef } from 'react';
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
  userNm: string;
};

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  login: (userId: string, userPw: string, rememberMe: boolean) => Promise<void>;
  kakaoLogin: (kakaoUserInfo: any, accessToken: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const hasInitialized = useRef(false);

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

  const kakaoLogin = async (kakaoUserInfo: any, accessToken: string) => {
    try {
      // 카카오 사용자 정보를 User 타입으로 변환
      const resolvedUser: User = {
        name: kakaoUserInfo?.properties?.nickname ?? 'Unknown',
        email: kakaoUserInfo?.kakao_account?.email ?? '',
        avatarUrl: kakaoUserInfo?.properties?.profile_image_url,
      };

      // 백엔드에 카카오 로그인 정보 전송 (선택사항)
      try {
        console.log('카카오 로그인 API 요청 시작:', {
          kakaoId: kakaoUserInfo.id,
          nickname: kakaoUserInfo.properties.nickname,
        });

        const response = await axiosInstance.post('/api/auth/kakao/callback', {
          kakaoId: kakaoUserInfo.id,
          nickname: kakaoUserInfo.properties.nickname,
          profileImage: kakaoUserInfo.properties.profile_image_url,
          email: kakaoUserInfo.kakao_account?.email,
          accessToken: accessToken,
        });

        console.log('카카오 로그인 API 응답:', response.data);

        const result = response?.data ?? {};

        // API 응답 구조에 따라 토큰 추출
        const token: string | undefined = result.data?.accessToken || result.accessToken || result.token;

        if (token) {
          localStorage.setItem('accessToken', token);
          setUser(resolvedUser);
          console.log('토큰 저장 완료');
        } else {
          console.warn('API 응답에서 토큰을 찾을 수 없습니다:', result);
        }
      } catch (error: any) {
        console.error('백엔드 카카오 로그인 처리 실패:', error);
        
        // 에러 응답이 HTML인 경우 (리다이렉트 등)
        if (error.response?.data && typeof error.response.data === 'string' && error.response.data.includes('<html>')) {
          console.error('서버에서 HTML 응답을 받았습니다. 리다이렉트가 발생했을 수 있습니다.');
        }
        
        // 백엔드 처리가 실패해도 클라이언트에서는 로그인 성공으로 처리
      }
    } catch (error) {
      console.error('카카오 로그인 처리 실패:', error);
      throw error;
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axiosInstance.post('/api/auth/refresh');
      const result = response?.data ?? {};
      
      // API 응답 구조에 따라 사용자 정보 추출
      const responseUser = (result?.user || result?.data?.user || result?.data) as UserResponseCheckToken | null;

      // Safely handle possible null for responseUser
      let resolvedUser: User;
      if (responseUser && (responseUser.user_nm || responseUser?.userNm)) {
        resolvedUser = {
          name: responseUser.user_nm || responseUser.userNm,
          email: responseUser.user_mail ?? '',
          avatarUrl: responseUser.avatarUrl,
        };
        console.log('사용자 정보 로드 성공:', resolvedUser);
      } else {
        console.warn('토큰 갱신 응답에서 사용자 정보를 찾을 수 없습니다:', result);
        resolvedUser = {
          name: 'Unknown',
          email: '',
          avatarUrl: undefined,
        };
      }

      setUser(resolvedUser);
    } catch (error: any) {
      console.error('토큰 갱신 실패:', error);
      
      // 401 에러인 경우 토큰이 만료된 것으로 간주
      if (error.response?.status === 401) {
        console.log('토큰이 만료되었습니다. 로그아웃 처리합니다.');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('auth_token');
        setUser(null);
      } else {
        // 다른 에러인 경우 사용자 정보를 null로 설정
        setUser(null);
      }
      
      throw error; // 상위에서 에러를 처리할 수 있도록 에러를 다시 던짐
    }
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
      // 이미 초기화되었다면 실행하지 않음
      if (hasInitialized.current) {
        console.log('이미 초기화됨, 토큰 체크 건너뜀');
        return;
      } else {
        hasInitialized.current = true;
      }
      
      try {
        // refreshToken을 통해 토큰 갱신 및 사용자 정보 확인 시도
        console.log('페이지 로드 시 토큰 갱신 및 사용자 정보 확인 시도');
        await refreshToken();
      } catch (error: any) {
        console.error('토큰 갱신 실패:', error);
        
        // refreshToken에서 이미 에러 처리를 했으므로 여기서는 추가 처리만
        if (error.response?.status !== 401) {
          // 401이 아닌 다른 에러인 경우에만 추가 정리
          setUser(null);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('auth_token');
        }
      } finally {
        setIsLoading(false);
        console.log('초기 로딩 완료');
      }
    };

    // 초기 토큰 확인
    checkTokenAndLogin();

    let isFirstRun = true; 

    // 주기적으로 토큰 health check (5분마다)
    const tokenHealthCheckInterval = setInterval(async () => {
      if (isFirstRun) {
        isFirstRun = false;
        return;
      }
      
      const token = localStorage.getItem('accessToken');
      if (token && user) {
        try {
          console.log('주기적 토큰 health check 실행');
          await refreshToken();
        } catch (error: any) {
          console.error('주기적 토큰 health check 실패:', error);
          // 에러 발생 시 자동으로 로그아웃 처리됨 (refreshToken 내부에서)
                  
          // refreshToken에서 이미 에러 처리를 했으므로 여기서는 추가 처리만
          if (error.response?.status !== 401) {
            // 401이 아닌 다른 에러인 경우에만 추가 정리
            setUser(null);
            localStorage.removeItem('accessToken');
            localStorage.removeItem('auth_token');
          }
        }
      }
    }, 0.5 * 60 * 1000); // 5분 = 5 * 60 * 1000ms

    // 컴포넌트 언마운트 시 interval 정리
    return () => {
      clearInterval(tokenHealthCheckInterval);
    };
  }, []); // 컴포넌트 마운트 시에만 실행

  const value = useMemo(() => ({ user, isLoading, login, kakaoLogin, logout, refreshToken}), [user, isLoading]);

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