import React from 'react';
import ServiceCard from './ServiceCard';

const ServicesSection: React.FC = () => {
  const servicesData = [
    { icon: "fas fa-envelope", title: "메일" },
    { icon: "fas fa-map", title: "지도" },
    { icon: "fas fa-cart-shopping", title: "쇼핑" },
    { icon: "fas fa-cloud", title: "클라우드" }
  ];

  return (
    <section id="services-section" className="mb-20">
      <h2 className="text-4xl text-black mb-10 font-bold">주요 서비스</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {servicesData.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection; 