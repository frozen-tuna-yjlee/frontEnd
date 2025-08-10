import React, { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import MainContent from './components/main/MainContent';
import Footer from './components/layout/Footer';
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
    <AuthProvider>
      <div className="h-full text-base-content">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
