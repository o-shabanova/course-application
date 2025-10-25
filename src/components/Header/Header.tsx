import React from 'react';
import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { BUTTON_TEXT } from '../../constants';
import './Header.css';

export const Header: React.FC = () => {
  return (
    <header className="header">
        <Logo/>
        <Button buttonText={BUTTON_TEXT.LOGOUT} type="button" className="main-button login-button" />
    </header>
  );
};

export default Header;