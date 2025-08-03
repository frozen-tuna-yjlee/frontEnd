import React from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title }) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-xl p-10 text-center hover:shadow-xl transition-all duration-300 cursor-pointer hover:border-black">
      <i className={`text-5xl text-neutral-700 mb-6 ${icon}`}></i>
      <h3 className="text-black text-xl font-bold">{title}</h3>
    </div>
  );
};

export default ServiceCard; 