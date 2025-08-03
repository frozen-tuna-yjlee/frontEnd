import React from 'react';
import WeatherWidget from '../widgets/WeatherWidget';
import StockWidget from '../widgets/StockWidget';
import TrendingWidget from '../widgets/TrendingWidget';
import ProfileWidget from '../widgets/ProfileWidget';

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