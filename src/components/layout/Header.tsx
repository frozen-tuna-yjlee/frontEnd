import React, { useState } from 'react';
import LoginPage from '../auth/LoginPage';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const [showLoginPage, setShowLoginPage] = useState(false);
  const { user, logout } = useAuth();

  const handleLoginClick = () => {
    setShowLoginPage(true);
  };

  const handleCloseLogin = () => {
    setShowLoginPage(false);
  };

  return (
    <>
      <div className="header">
        <div className="header-container">
          <div className="header-content">
            <div className="header-left">
              <div className="logo">Portal</div>
              <nav className="nav-menu">
                <span className="nav-item">뉴스</span>
                <span className="nav-item">스포츠</span>
                <span className="nav-item">연예</span>
                <span className="nav-item">경제</span>
                <span className="nav-item">생활</span>
              </nav>
            </div>
            <div className="header-right">
              <button className="icon-button">
                <i className="far fa-bell"></i>
              </button>
              {user ? (
                <>
                  <div className="icon-button">
                    <i className="far fa-user"></i>
                  </div>
                  <span className="user-name">{user.name}</span>
                  <button onClick={() => logout()} className="login-button">로그아웃</button>
                </>
              ) : (
                <>
                  <button className="icon-button">
                    <i className="far fa-user"></i>
                  </button>
                  <button 
                    onClick={handleLoginClick}
                    className="login-button"
                  >
                    로그인
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {showLoginPage && <LoginPage onClose={handleCloseLogin} />}
    </>
  );
};

export default Header; 