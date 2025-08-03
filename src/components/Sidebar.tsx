import React from 'react';
import WeatherWidget from './WeatherWidget';
import StockWidget from './StockWidget';
import TrendingWidget from './TrendingWidget';
import ProfileWidget from './ProfileWidget';

const Sidebar: React.FC = () => {
  return (
    <aside className="xl:col-span-1 space-y-6">
      <ProfileWidget />
      <WeatherWidget />
      <StockWidget />
      <TrendingWidget />
    </aside>
  );
};

export default Sidebar; 