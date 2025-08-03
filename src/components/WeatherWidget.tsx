import React from 'react';

const WeatherWidget: React.FC = () => {
  return (
    <section id="weather-widget" className="bg-white border border-neutral-200 rounded-lg p-6 mb-6">
      <h3 className="text-black mb-4">날씨</h3>
      <div className="text-center">
        <i className="fas fa-sun text-4xl text-neutral-700 mb-2"></i>
        <div className="text-2xl text-black">23°C</div>
        <div className="text-neutral-600 text-sm">서울, 맑음</div>
      </div>
    </section>
  );
};

export default WeatherWidget; 