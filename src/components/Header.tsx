import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-8">
          <div className="text-2xl text-black">Portal</div>
          <nav className="hidden md:flex space-x-6">
            <span className="text-neutral-700 hover:text-black cursor-pointer">뉴스</span>
            <span className="text-neutral-700 hover:text-black cursor-pointer">스포츠</span>
            <span className="text-neutral-700 hover:text-black cursor-pointer">연예</span>
            <span className="text-neutral-700 hover:text-black cursor-pointer">경제</span>
            <span className="text-neutral-700 hover:text-black cursor-pointer">생활</span>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-neutral-700 hover:text-black">
            <i className="far fa-bell"></i>
          </button>
          <button className="text-neutral-700 hover:text-black">
            <i className="far fa-user"></i>
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-lg text-sm">로그인</button>
        </div>
      </div>
    </div>
  );
};

export default Header; 