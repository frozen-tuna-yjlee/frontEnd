import React from 'react';
import SearchSection from './SearchSection';
import NewsSection from './NewsSection';
import ServicesSection from './ServicesSection';
import EntertainmentSection from './EntertainmentSection';
import Sidebar from './Sidebar';

const MainContent: React.FC = () => {
  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 py-8">
      <SearchSection />
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <NewsSection />
          <ServicesSection />
          <EntertainmentSection />
        </div>
        <Sidebar />
      </div>
    </main>
  );
};

export default MainContent; 