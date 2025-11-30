import { FC } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

