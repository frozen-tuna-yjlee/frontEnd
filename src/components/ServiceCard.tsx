import React from 'react';

interface ServiceCardProps {
  icon: string;
  title: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title }) => {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
      <i className={`text-3xl text-neutral-700 mb-3 ${icon}`}></i>
      <h3 className="text-black">{title}</h3>
    </div>
  );
};

export default ServiceCard; 