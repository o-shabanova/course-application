import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';

export type UserState = {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
};

export type LoginPayload = {
  name: string;
  email: string;
  token: string;
};

type LoginResponse = {
  result: string;
  user?: {
    name: string;
    email: string;
  };
};

const getInitialState = (): UserState => {
  const token = localStorage.getItem('token') ?? '';
  const name = localStorage.getItem('user') ?? '';
  const email = localStorage.getItem('userEmail') ?? '';

  return {
    isAuth: Boolean(token),
    name,
    email,
    token,
  };
};

const userSlice = createSlice({
  name: 'user',
  initialState: getInitialState(),
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.isAuth = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuth = false;
      state.name = '';
      state.email = '';
      state.token = '';
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userEmail');
    },
  },
});

export const { login, logout } = userSlice.actions;

export const getUser = (dispatch: Dispatch, responseData: LoginResponse, email?: string) => {
  const token = responseData?.result || '';
  const userData = responseData?.user;
  
  localStorage.setItem('token', token);
  
  if (userData && userData.name) {
    localStorage.setItem('user', userData.name);
  }
  
  if (userData && userData.email) {
    localStorage.setItem('userEmail', userData.email);
  } else if (email) {
    localStorage.setItem('userEmail', email);
  }

  dispatch(login({
    name: userData?.name || '',
    email: userData?.email || email || '',
    token,
  }));
};

export default userSlice.reducer;


