import { getCurrentUser, logoutUser } from '../../services';
import { setCurrentUser, logout } from './userSlice';
import type { AppDispatch, RootState } from '..';

export const loadCurrentUser = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().user.token || localStorage.getItem('token') || '';

    if (!token) {
      return;
    }

    try {
      const user = await getCurrentUser(token);
      dispatch(setCurrentUser(user));
    } catch (error) {
      console.error('Failed to fetch current user:', error);
    }
  };
};

export const logoutCurrentUser = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const token = getState().user.token || localStorage.getItem('token') || '';

    try {
      if (token) {
        await logoutUser(token);
      }
    } catch (error) {
      console.error('Failed to logout:', error);
    } finally {
      dispatch(logout());
    }
  };
};
