import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { isAdminRole } from '../../constants';

const PrivateRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { isAuth, role } = useSelector((state: RootState) => state.user);

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  if (!role) {
    return null;
  }

  return isAdminRole(role) ? children : <Navigate to="/courses" replace />;

};

export default PrivateRoute;
