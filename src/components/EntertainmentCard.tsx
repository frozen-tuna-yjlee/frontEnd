import React from 'react';

interface EntertainmentCardProps {
  imageText: string;
  title: string;
  description: string;
}

const EntertainmentCard: React.FC<EntertainmentCardProps> = ({ imageText, title, description }) => {
  return (
    <article className="border border-neutral-200 rounded-lg p-4">
      <div className="bg-neutral-600 h-32 rounded mb-3 flex items-center justify-center">
        <span className="text-white text-sm">{imageText}</span>
      </div>
      <h4 className="mb-2">{title}</h4>
      <p className="text-neutral-600 text-sm">{description}</p>
    </article>
  );
};

export default EntertainmentCard; 