import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="w-full bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-2">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-12">
            <div className="text-3xl text-black font-bold">Portal</div>
            <nav className="hidden md:flex space-x-8">
              <span className="text-neutral-700 hover:text-black cursor-pointer text-lg transition-colors">뉴스</span>
              <span className="text-neutral-700 hover:text-black cursor-pointer text-lg transition-colors">스포츠</span>
              <span className="text-neutral-700 hover:text-black cursor-pointer text-lg transition-colors">연예</span>
              <span className="text-neutral-700 hover:text-black cursor-pointer text-lg transition-colors">경제</span>
              <span className="text-neutral-700 hover:text-black cursor-pointer text-lg transition-colors">생활</span>
            </nav>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-neutral-700 hover:text-black text-xl transition-colors">
              <i className="far fa-bell"></i>
            </button>
            <button className="text-neutral-700 hover:text-black text-xl transition-colors">
              <i className="far fa-user"></i>
            </button>
            <button className="bg-black text-white px-6 py-3 rounded-lg text-base font-medium hover:bg-gray-800 transition-colors">로그인</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header; 