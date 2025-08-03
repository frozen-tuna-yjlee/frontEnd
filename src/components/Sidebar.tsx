import React from 'react';
import WeatherWidget from './WeatherWidget';
import StockWidget from './StockWidget';
import TrendingWidget from './TrendingWidget';

const Sidebar: React.FC = () => {
  return (
    <aside id="sidebar" className="lg:col-span-1">
      <WeatherWidget />
      <StockWidget />
      <TrendingWidget />
    </aside>
  );
};

export default Sidebar; 