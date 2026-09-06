import { getCurrentUser } from '../../services';
import { setCurrentUser } from './userSlice';
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
