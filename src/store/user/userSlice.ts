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
    loginSuccess(state, action: PayloadAction<LoginPayload>) {
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

export const { loginSuccess, logout } = userSlice.actions;

export const getUser = (dispatch: Dispatch, responseData: LoginResponse, email?: string) => {
  const token = responseData.result;
  const userData = responseData.user;
  
  const userName = userData?.name || '';
  const userEmail = userData?.email || email || '';

  localStorage.setItem('token', token);
  localStorage.setItem('user', userName);
  localStorage.setItem('userEmail', userEmail);

  dispatch(loginSuccess({
    name: userName,
    email: userEmail,
    token,
  }));
};

export default userSlice.reducer;


