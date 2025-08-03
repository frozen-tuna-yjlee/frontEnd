import React from 'react';

interface NewsCardProps {
  title: string;
  description: string;
  source: string;
  date: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, source, date }) => {
  return (
    <article className="border border-neutral-200 rounded-lg overflow-hidden">
      <div className="bg-neutral-600 h-48 flex items-center justify-center">
        <span className="text-white text-sm">뉴스 이미지</span>
      </div>
      <div className="p-4">
        <h3 className="text-lg mb-2">{title}</h3>
        <p className="text-neutral-600 text-sm mb-2">{description}</p>
        <div className="flex justify-between items-center text-xs text-neutral-500">
          <span>{source}</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard; 