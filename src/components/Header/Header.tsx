import React from 'react';
import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';

export const Header: React.FC = () => {
  return (
    <header>
      <div>
        <Logo/>
      </div>
      <div>
        <Button buttonText="LOGIN" onClick={() => {}} type="button" className="button" />
      </div>
    </header>
  );
};

export default Header;