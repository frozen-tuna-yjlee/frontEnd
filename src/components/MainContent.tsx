import React from 'react';
import SearchSection from './SearchSection';
import NewsSection from './NewsSection';
import ServicesSection from './ServicesSection';
import EntertainmentSection from './EntertainmentSection';
import Sidebar from './Sidebar';

const MainContent: React.FC = () => {
  return (
    <main id="main-content" className="w-full bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-1 pt-12 pb-0">
        <SearchSection />
        
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          <div className="xl:col-span-4">
            <NewsSection />
            <ServicesSection />
            <EntertainmentSection />
          </div>
          <div className="xl:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent; 