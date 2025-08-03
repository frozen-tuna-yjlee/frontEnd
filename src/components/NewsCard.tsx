import React from 'react';

interface NewsCardProps {
  title: string;
  description: string;
  source: string;
  date: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, source, date }) => {
  return (
    <article className="bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="bg-neutral-600 h-56 flex items-center justify-center">
        <span className="text-white text-lg">뉴스 이미지</span>
      </div>
      <div className="p-8">
        <h3 className="text-2xl mb-4 font-bold leading-tight">{title}</h3>
        <p className="text-neutral-600 text-lg mb-6 leading-relaxed">{description}</p>
        <div className="flex justify-between items-center text-base text-neutral-500">
          <span className="font-semibold">{source}</span>
          <span>{date}</span>
        </div>
      </div>
    </article>
  );
};

export default NewsCard; 