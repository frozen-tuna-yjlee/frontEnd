import React from 'react';
import NewsCard from './NewsCard';

const NewsSection: React.FC = () => {
  const newsData = [
    {
      title: "주요 경제 뉴스 헤드라인",
      description: "경제 관련 주요 소식을 전해드립니다...",
      source: "경제신문",
      date: "2025-01-15"
    },
    {
      title: "정치 관련 주요 이슈",
      description: "정치계의 최근 동향을 알려드립니다...",
      source: "정치일보",
      date: "2025-01-15"
    }
  ];

  return (
    <section id="news-section" className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl text-black">주요 뉴스</h2>
        <span className="text-neutral-600 hover:text-black text-sm cursor-pointer">
          더보기 <i className="fas fa-arrow-right"></i>
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {newsData.map((news, index) => (
          <NewsCard
            key={index}
            title={news.title}
            description={news.description}
            source={news.source}
            date={news.date}
          />
        ))}
      </div>
    </section>
  );
};

export default NewsSection; 