import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit';


export type UserState = {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
};

const tokenFromStorage = localStorage.getItem('token') ?? '';
const nameFromStorage = localStorage.getItem('user') ?? '';
const emailFromStorage = localStorage.getItem('userEmail') ?? '';

const initialState: UserState = {
  isAuth: Boolean(tokenFromStorage),
  name: nameFromStorage,
  email: emailFromStorage,
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
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('userEmail');
    },
  },
});

export const { loginSuccess, logout } = userSlice.actions;

export const getUser = (dispatch: Dispatch, responseData: any, email?: string) => {
  console.log('getUser - responseData:', responseData);
  
  const token = responseData.result || responseData.token || '';
  const userData = responseData.user || {};
  
  const userName = userData.name || responseData.name || '';
  const userEmail = userData.email || responseData.email || email || '';
  
  console.log('getUser - extracted data:', { token, userName, userEmail, userData, fullResponse: responseData });
  
  if (!token) {
    console.error('getUser - No token found in response!');
    return;
  }
  
  localStorage.setItem('token', token);
  localStorage.setItem('user', userName);
  localStorage.setItem('userEmail', userEmail);
  
  console.log('getUser - Saved to localStorage:', { 
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user'),
    userEmail: localStorage.getItem('userEmail')
  });
  
  dispatch(loginSuccess({
    name: userName,
    email: userEmail,
    token: token,
  }));
  
  console.log('getUser - dispatched loginSuccess with:', { name: userName, email: userEmail, token });
};

export default userSlice.reducer;


