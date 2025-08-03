import React from 'react';

const SearchSection: React.FC = () => {
  return (
    <section id="search-section" className="mb-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl text-black mb-4">통합 검색</h1>
        <div className="max-w-2xl mx-auto relative">
          <input 
            type="text" 
            placeholder="검색어를 입력하세요" 
            className="w-full px-6 py-4 border border-neutral-300 rounded-full text-lg focus:outline-none focus:border-black"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white px-6 py-2 rounded-full">
            <i className="fas fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchSection; 