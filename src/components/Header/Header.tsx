import React from 'react';
import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { BUTTON_TEXT } from '../../constants';
import './Header.css';

export const Header: React.FC = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const isLoggedIn = !!token;

  let userName = null;
    try {
      userName = user ? JSON.parse(user).name : null;
    } catch {
      userName = null;
    }

  return (
    <header className="header">
        <Logo/>
        {isLoggedIn && user && (
          <span className="user-name">{userName}</span>
        )}
        <Button buttonText={BUTTON_TEXT.LOGOUT} type="button" className="main-button login-button" />
    </header>
  );
};

export default Header;