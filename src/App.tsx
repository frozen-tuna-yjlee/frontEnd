import React, { useEffect } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';

function App() {
  useEffect(() => {
    // Font Awesome 설정
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js';
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'no-referrer';
    document.head.appendChild(script);

    // Font Awesome 설정
    (window as any).FontAwesomeConfig = {
      autoReplaceSvg: 'nest',
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="h-full text-base-content">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
