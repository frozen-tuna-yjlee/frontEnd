import React, { useState } from 'react';
// axios is handled inside AuthContext
import { useAuth } from '../../context/AuthContext';
import KakaoLogin from './KakaoLogin';
import './LoginPage.css';

interface LoginPageProps {
  onClose: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onClose }) => {
  const [userId, setUserId] = useState('');
  const [userPw, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  // 카카오 로그인 성공 핸들러
  const handleKakaoSuccess = async (userInfo: any) => {
    setIsLoading(true);
    setError('');
    
    try {
      console.log('카카오 로그인 성공:', userInfo);
      // 여기서 백엔드로 카카오 로그인 정보를 전송
      // await login('kakao', userInfo.accessToken);
      
      // 임시로 성공 처리
      onClose();
    } catch (err: any) {
      console.error('카카오 로그인 처리 실패:', err);
      setError('카카오 로그인 처리에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 카카오 로그인 실패 핸들러
  const handleKakaoError = (error: any) => {
    console.error('카카오 로그인 실패:', error);
    setError('카카오 로그인에 실패했습니다.');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(userId, userPw, rememberMe);
      onClose();
    } catch (err: any) {
      console.error('Login failed:', err);
      
      // 에러 메시지 설정
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('로그인에 실패했습니다. 다시 시도해주세요.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-overlay" onClick={onClose}>
      <div className="login-modal" onClick={(e) => e.stopPropagation()}>
        {/* 헤더 */}
        <div className="login-header">
          <h2 className="login-title">로그인</h2>
          <button onClick={onClose} className="close-button">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* 로그인 폼 */}
        <form onSubmit={handleSubmit} className="login-form">
          {/* 에러 메시지 */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {/* 아이디 입력 */}
          <div className="form-group">
            <label htmlFor="userId" className="form-label">
              아이디
            </label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="form-input"
              placeholder="아이디를 입력하세요"
              required
              disabled={isLoading}
            />
          </div>

          {/* 비밀번호 입력 */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              비밀번호
            </label>
            <input
              type="password"
              id="password"
              value={userPw}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              placeholder="비밀번호를 입력하세요"
              required
              disabled={isLoading}
            />
          </div>

          {/* 추가 옵션 */}
          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="checkbox-input"
                disabled={isLoading}
              />
              <span className="checkbox-text">로그인 상태 유지</span>
            </label>
            <button type="button" className="forgot-password" disabled={isLoading}>
              비밀번호 찾기
            </button>
          </div>

          {/* 로그인 버튼 */}
          <button 
            type="submit" 
            className="login-button"
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>

          {/* 소셜 로그인 */}
          <div className="social-login">
            <div className="divider">
              <span className="divider-text">또는</span>
            </div>
            
            <button 
              type="button" 
              className="google-login"
              disabled={isLoading}
            >
              <i className="fab fa-google"></i>
              <span>Google로 로그인</span>
            </button>

            {/* 카카오 로그인 */}
            <div className="kakao-login-container">
              <KakaoLogin
                onSuccess={handleKakaoSuccess}
                onError={handleKakaoError}
                className="kakao-login-button"
              />
            </div>
          </div>

          {/* 회원가입 링크 */}
          <div className="signup-link">
            <span>계정이 없으신가요? </span>
            <button 
              type="button" 
              className="signup-button"
              disabled={isLoading}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 