import React from 'react';
import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { BUTTON_TEXT } from '../../constants';
import './Header.css';

export const Header: React.FC = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const isLoggedIn = !!token;

  return (
    <header className="header">
        <Logo/>
        {isLoggedIn && user && (
          <span className="user-name">{JSON.parse(user).name}</span>
        )}
        <Button buttonText={BUTTON_TEXT.LOGOUT} type="button" className="main-button login-button" />
    </header>
  );
};

export default Header;