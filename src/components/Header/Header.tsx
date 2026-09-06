import React from 'react';
import { Button } from '../../common/Button/Button';
import { Logo } from './components/Logo/Logo';
import { BUTTON_TEXT, isAdminRole } from '../../constants';
import './Header.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { logout } from '../../store/user/userSlice';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const { name, isAuth, role } = useSelector((state: RootState) => state.user);
  const isAdmin = isAdminRole(role);
  const displayName = name || (isAdmin ? 'Admin' : '');

  const isAuthPage =
    location.pathname === '/login' ||
    location.pathname === '/registration';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="header">
        <Logo/>
        {!isAuthPage && isAuth && (
          <span className="user-name">{displayName}</span>
        )}

        {!isAuthPage && isAuth && (
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