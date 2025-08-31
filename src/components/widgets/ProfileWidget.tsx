import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfileWidget: React.FC = () => {
  const { user, logout, login } = useAuth();
  const [userId, setUserId] = useState('');
  const [userPw, setUserPw] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInlineLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      await login(userId, userPw, false);
      setUserId('');
      setUserPw('');
    } catch (err: any) {
      if (err?.response?.data?.message) setError(err.response.data.message);
      else if (err?.message) setError(err.message);
      else setError('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <section id="profile-widget" className="bg-white border border-neutral-200 rounded-xl p-8 shadow-lg mb-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-neutral-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <i className="far fa-user text-3xl text-neutral-500"></i>
          </div>
          <h3 className="text-black mb-2 text-lg font-bold">로그인</h3>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-3 py-2 mb-3">{error}</div>
          )}
          <form onSubmit={handleInlineLogin} className="space-y-3 text-left">
            <div>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                placeholder="아이디"
                disabled={isLoading}
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={userPw}
                onChange={(e) => setUserPw(e.target.value)}
                className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-300"
                placeholder="비밀번호"
                disabled={isLoading}
                required
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white text-sm py-2 rounded-md hover:bg-neutral-800 transition-colors disabled:opacity-60"
            >
              {isLoading ? '로그인 중...' : '로그인'}
            </button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section id="profile-widget" className="bg-white border border-neutral-200 rounded-xl p-8 shadow-lg mb-6">
      <div className="text-center">
        <div className="w-20 h-20 bg-neutral-300 rounded-full mx-auto mb-4 overflow-hidden flex items-center justify-center">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="avatar" className="w-20 h-20 object-cover" />
          ) : (
            <i className="fas fa-user text-3xl text-neutral-600"></i>
          )}
        </div>
        <h3 className="text-black mb-2 text-lg font-bold">{user.name}</h3>
        <p className="text-neutral-600 text-sm mb-4">{user.email}</p>
        <div className="flex justify-center space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors">
            프로필 편집
          </button>
          <button onClick={() => logout()} className="bg-neutral-200 text-black px-4 py-2 rounded-lg text-sm hover:bg-neutral-300 transition-colors">
            로그아웃
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProfileWidget; 