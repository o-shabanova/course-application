import { getCurrentUser, LoginCredentials, loginUser, logoutUser } from '../../services';
import { login, setCurrentUser, logout } from './userSlice';
import type { AppDispatch, RootState } from '..';

export const loginCurrentUser = (credentials: LoginCredentials) => {
  return async (dispatch: AppDispatch) => {
    try {
      const { token, name, email } = await loginUser(credentials);
      const result = await getCurrentUser(token);

      if (!result.ok) {
        return { ok: false as const, message: 'Failed to fetch current user' };
      }

      dispatch(login({
        name: result.user.name || name,
        email: result.user.email || email,
        token,
        role: result.user.role,
      }));

      return { ok: true as const };
    } catch (error) {
      const message = error instanceof Error
        ? error.message
        : 'Network error. Please try again later.';

      return { ok: false as const, message };
    }
  };
};

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
