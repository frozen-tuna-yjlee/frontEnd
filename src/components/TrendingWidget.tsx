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
    <section id="trending-widget" className="bg-white border border-neutral-200 rounded-lg p-6">
      <h3 className="text-black mb-4">실시간 검색어</h3>
      <ol className="space-y-2">
        {trendingData.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className={`text-white text-xs px-2 py-1 rounded ${index === 0 ? 'bg-black' : 'bg-neutral-600'}`}>
              {index + 1}
            </span>
            <span className="text-sm">{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default TrendingWidget; 