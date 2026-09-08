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
      const result = await getCurrentUser(token);

      if (result.ok) {
        dispatch(setCurrentUser(result.user));
        return;
      }

      if (result.reason === 'unauthorized') {
        dispatch(logout());
        return;
      }

      console.error('Failed to fetch current user');
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
