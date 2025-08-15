import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

interface KakaoLoginProps {
  onSuccess?: (userInfo: any) => void;
  onError?: (error: any) => void;
  className?: string;
}

declare global {
  interface Window {
    Kakao: any;
  }
}

const KakaoLogin: React.FC<KakaoLoginProps> = ({ 
  onSuccess, 
  onError, 
  className = '' 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);
  const [isKakaoKeySet, setIsKakaoKeySet] = useState(false);
  const { login } = useAuth();

  // 카카오 SDK 초기화
  useEffect(() => {
    const initializeKakao = () => {
      if (window.Kakao) {
        if (!window.Kakao.isInitialized()) {
          // 카카오 JavaScript 키를 여기에 입력하세요
          const kakaoKey = '94f7795b9f24715dc2dc8f78420dda8d';
          // 키가 설정되어 있고 유효한지 확인
          if (kakaoKey && kakaoKey.length > 10) {
            window.Kakao.init(kakaoKey);
            setIsKakaoKeySet(true);
          } else {
            console.warn('카카오 JavaScript 키가 설정되지 않았습니다. KakaoLogin.tsx 파일에서 키를 설정해주세요.');
            setIsKakaoKeySet(false);
            return;
          }
        }
        setIsKakaoInitialized(true);
      }
    };

    // 카카오 SDK 스크립트 로드
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    script.onload = initializeKakao;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // 카카오 로그인 처리
  const handleKakaoLogin = async () => {
    if (!isKakaoInitialized) {
      console.error('카카오 SDK가 초기화되지 않았습니다.');
      if (onError) {
        onError({ message: '카카오 SDK가 초기화되지 않았습니다. JavaScript 키를 설정해주세요.' });
      }
      return;
    }

    setIsLoading(true);

    try {
      // 카카오 로그인 실행
      const response = await new Promise((resolve, reject) => {
        window.Kakao.Auth.login({
          success: resolve,
          fail: reject,
        });
      });

      // 사용자 정보 가져오기
      const userInfo = await new Promise((resolve, reject) => {
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: resolve,
          fail: reject,
        });
      });

      // 카카오 액세스 토큰 가져오기
      const accessToken = window.Kakao.Auth.getAccessToken();

      // 백엔드로 카카오 로그인 정보 전송
      try {
        // 여기서 백엔드 API 호출
        // const loginResponse = await login('kakao', accessToken);
        
        // 임시로 콘솔에 출력
        console.log('카카오 로그인 성공:', {
          userInfo,
          accessToken,
        });

        // 성공 콜백 호출
        if (onSuccess) {
          onSuccess({
            userInfo,
            accessToken,
            provider: 'kakao',
          });
        }
      } catch (error) {
        console.error('백엔드 로그인 실패:', error);
        if (onError) {
          onError(error);
        }
      }
    } catch (error) {
      console.error('카카오 로그인 실패:', error);
      if (onError) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 카카오 로그아웃
  const handleKakaoLogout = () => {
    if (window.Kakao && window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout();
      console.log('카카오 로그아웃 완료');
    }
  };

  return (
    <button
      onClick={handleKakaoLogin}
      disabled={isLoading || !isKakaoInitialized || !isKakaoKeySet}
      className={`
        flex items-center justify-center w-full px-4 py-3 
        bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300
        text-black font-medium rounded-lg transition-colors duration-200
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
    >
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          <span>로그인 중...</span>
        </div>
      ) : (
        <div className="flex items-center space-x-2">
          {/* 카카오 로고 SVG */}
          <svg 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="currentColor"
            className="flex-shrink-0"
          >
            <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/>
          </svg>
          <span>{isKakaoKeySet ? '카카오로 로그인' : '카카오 키 설정 필요'}</span>
        </div>
      )}
    </button>
  );
};

export default KakaoLogin;
