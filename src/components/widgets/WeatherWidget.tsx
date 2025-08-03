import React from 'react';

const WeatherWidget: React.FC = () => {
  return (
    <section id="weather-widget" className="bg-white border border-neutral-200 rounded-xl p-8 shadow-lg">
      <h3 className="text-black mb-6 text-xl font-bold">날씨</h3>
      <div className="text-center">
        <i className="fas fa-sun text-5xl text-neutral-700 mb-4"></i>
        <div className="text-3xl text-black font-bold mb-2">23°C</div>
        <div className="text-neutral-600 text-lg">서울, 맑음</div>
      </div>
    </section>
  );
};

export default WeatherWidget; 