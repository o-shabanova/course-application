import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CurrentUser } from '../../services';

export type UserState = {
    isAuth: boolean;
    name: string;
    email: string;
    token: string;
    role: string;
};

export type LoginPayload = {
    name: string;
    email: string;
    token: string;
};

export const getUser = () => {
    const userInitialState: UserState = { 
        isAuth: false, 
        name: "", 
        email: "", 
        token: "", 
        role: "" 
    };
    
    try {
        const token = localStorage.getItem('token') ?? '';
        const user = localStorage.getItem('user') ?? '';

        if (!token) {
            return userInitialState;
        }

        if (!user) {
            return {
                ...userInitialState,
                token,
            };
        }

        let name = "";
        let email = "";
        try {
            const userObject = JSON.parse(user);
            name = userObject.name;
            email = userObject.email;
        } catch (e) {
            name = user;
        }

        return {
            isAuth: !!token,
            name: name || "",
            email: email || "",
            token: token || "",
            role: "",
        };
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return userInitialState;
    }
};

const setUserToLocalStorage = (name: string, email: string) => {
    localStorage.setItem(
        "user",
        JSON.stringify({
            name,
            email,
        })
    );
};

const initialState: UserState = getUser();

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.isAuth = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.token = action.payload.token;
            localStorage.setItem("token", action.payload.token);
            setUserToLocalStorage(action.payload.name, action.payload.email);
        },
        setCurrentUser(state, action: PayloadAction<CurrentUser>) {
            state.isAuth = true;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
            setUserToLocalStorage(action.payload.name, action.payload.email);
        },
        logout(state) {
            state.isAuth = false;
            state.name = '';
            state.email = '';
            state.token = '';
            state.role = '';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
});

export const { login, setCurrentUser, logout } = userSlice.actions;
export default userSlice.reducer;


