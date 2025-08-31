import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/layout/Header';
import MainContent from './components/main/MainContent';
import Footer from './components/layout/Footer';
import './App.css';

function AppContent() {
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

  const { isLoading } = useAuth();

  // 로딩 중일 때 로딩 화면 표시
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  return (
    <div className="h-full text-base-content">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
