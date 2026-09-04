import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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

export const getUser = () => {
    const emptyUser = { isAuth: false, name: "", email: "", token: "" };
    try {
        const token = localStorage.getItem('token') ?? '';
        const user = localStorage.getItem('user') ?? '';

        if (!token || !user) {
            return emptyUser;
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
            isAuth: !!(token && name),
            name: name || "",
            email: email || "",
            token: token || "",
        };
    } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        return emptyUser;
    }
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
            localStorage.setItem(
                "user",
                JSON.stringify({
                    name: action.payload.name,
                    email: action.payload.email,
                })
            );
        },
        logout(state) {
            state.isAuth = false;
            state.name = '';
            state.email = '';
            state.token = '';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;


