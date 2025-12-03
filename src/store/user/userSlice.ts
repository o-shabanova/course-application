import { createSlice, PayloadAction } from '@reduxjs/toolkit';


export type UserState = {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
};

const tokenFromStorage = localStorage.getItem('token') ?? '';

const initialState: UserState = {
  isAuth: Boolean(tokenFromStorage),
  name: '',
  email: '',
  token: tokenFromStorage,
};

export type LoginPayload = {
  name: string;
  email: string;
  token: string;
};

const userSlice = createSlice({
  name: 'user',
  initialState,
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
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;


