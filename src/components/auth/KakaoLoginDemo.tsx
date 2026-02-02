import React, { useState } from 'react';
import KakaoLogin from './KakaoLogin';

const KakaoLoginDemo: React.FC = () => {
  const [loginResult, setLoginResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleKakaoSuccess = (userInfo: any) => {
    setLoginResult(userInfo);
    setError(null);
    console.log('카카오 로그인 성공:', userInfo);
  };

  const handleKakaoError = (error: any) => {
    setError(error.message || '카카오 로그인에 실패했습니다.');
    setLoginResult(null);
    console.error('카카오 로그인 에러:', error);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            카카오 로그인 데모
          </h1>
          <p className="text-gray-600">
            카카오 로그인 컴포넌트를 테스트해보세요
          </p>
        </div>

        {/* 카카오 로그인 버튼 */}
        <div className="mb-6">
          <KakaoLogin
            onSuccess={handleKakaoSuccess}
            onError={handleKakaoError}
            className="mb-4"
          />
        </div>

        {/* 에러 메시지 */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {/* 로그인 결과 */}
        {loginResult && (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-semibold text-green-800 mb-2">
              로그인 성공!
            </h3>
            <div className="text-sm text-green-700">
              <p><strong>Provider:</strong> {loginResult.provider}</p>
              <p><strong>Access Token:</strong> {loginResult.accessToken?.substring(0, 20)}...</p>
              {loginResult.userInfo && (
                <div className="mt-2">
                  <p><strong>User ID:</strong> {loginResult.userInfo.id}</p>
                  <p><strong>Nickname:</strong> {loginResult.userInfo.properties?.nickname}</p>
                  <p><strong>Email:</strong> {loginResult.userInfo.kakao_account?.email}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 사용법 안내 */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2">사용법</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>1. 카카오 개발자 콘솔에서 JavaScript 키를 발급받으세요</p>
            <p>2. KakaoLogin.tsx 파일의 'YOUR_KAKAO_JAVASCRIPT_KEY'를 실제 키로 교체하세요</p>
            <p>3. 카카오 로그인 버튼을 클릭하여 테스트하세요</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KakaoLoginDemo;
