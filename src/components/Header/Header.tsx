import React from 'react';
import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { BUTTON_TEXT } from '../../constants';
import './Header.css';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const isLoggedIn = !!token;

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    console.log('user:', user);
    console.log('token:', token);

    navigate('/login');
  };

  // Check if we are on Login or Registration pages
  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/registration';

  let userName = null;
    try {
      userName = user ? JSON.parse(user).name : null;
    } catch {
      userName = null;
    }

  return (
    <header className="header">
        <Logo/>
        {!isAuthPage && isLoggedIn && userName && (
          <span className="user-name">{userName}</span>
        )}

        {!isAuthPage && isLoggedIn && (
          <Button 
            buttonText={BUTTON_TEXT.LOGOUT} 
            type="button" 
            className="main-button login-button" 
            onClick={handleLogout}
          />
        )}
    </header>
  );
};

export default Header;