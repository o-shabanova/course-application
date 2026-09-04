import { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const PrivateRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth);
  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

