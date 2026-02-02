import React from 'react';

const TrendingWidget: React.FC = () => {
  const trendingData = [
    "검색어 1",
    "검색어 2", 
    "검색어 3",
    "검색어 4",
    "검색어 5"
  ];

  return (
    <section id="trending-widget" className="bg-white border border-neutral-200 rounded-xl p-8 shadow-lg">
      <h3 className="text-black mb-6 text-xl font-bold">실시간 검색어</h3>
      <ol className="space-y-3">
        {trendingData.map((item, index) => (
          <li key={index} className="flex items-center space-x-3">
            <span className={`text-white text-sm w-9 py-2 rounded-lg font-bold ${index === 0 ? 'bg-black' : 'bg-neutral-600'}`}>
              {index + 1}
            </span>
            <span className="text-base font-semibold">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TrendingWidget; 