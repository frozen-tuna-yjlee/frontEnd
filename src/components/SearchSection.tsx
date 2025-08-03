import React from 'react';

const SearchSection: React.FC = () => {
  return (
    <section id="search-section" className="mb-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl text-black mb-8 font-bold">통합 검색</h1>
        <div className="max-w-4xl mx-auto relative">
          <input 
            type="text" 
            placeholder="검색어를 입력하세요" 
            className="w-full px-8 py-6 border border-neutral-300 rounded-full text-xl focus:outline-none focus:border-black focus:ring-4 focus:ring-black focus:ring-opacity-20 shadow-lg"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-black text-white px-8 py-3 rounded-full text-lg hover:bg-gray-800 transition-colors shadow-lg">
            <i className="fas fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection; 