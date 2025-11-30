import React, { useState, useEffect } from 'react';
import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { BUTTON_TEXT } from '../../constants';
import './Header.css';
import { useNavigate, useLocation } from 'react-router-dom';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState<{ name: string, email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // Check if we are on Login or Registration pages
  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/registration';

useEffect(() => {
  const currentToken = localStorage.getItem('token');
  const currentUser = localStorage.getItem('user');
  setIsLoggedIn(!!currentToken);

  

  let userName = null;
    try {
      userName = currentUser ? JSON.parse(currentUser).name : null;
    } catch {
      userName = null;
    }

    setToken(currentToken);
    setUser(JSON.parse(currentUser || '{}'));
}, [location.pathname]);


    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
  
      console.log('user:', user);
      console.log('token:', token);
  
      navigate('/login');
    };

  return (
    <header className="header">
        <Logo/>
        {!isAuthPage && isLoggedIn && (
          <span className="user-name">{user?.name}</span>
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