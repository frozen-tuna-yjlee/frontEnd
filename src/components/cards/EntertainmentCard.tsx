import React from 'react';

interface EntertainmentCardProps {
  imageText: string;
  title: string;
  description: string;
}

const EntertainmentCard: React.FC<EntertainmentCardProps> = ({ imageText, title, description }) => {
  return (
    <article className="bg-white border border-neutral-200 rounded-xl p-8 hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-black">
      <div className="bg-neutral-600 h-56 rounded-lg mb-6 flex items-center justify-center">
        <span className="text-white text-lg">{imageText}</span>
      </div>
      <h4 className="mb-4 text-xl font-bold">{title}</h4>
      <p className="text-neutral-600 text-lg leading-relaxed">{description}</p>
    </article>
  );
};

export default EntertainmentCard; 