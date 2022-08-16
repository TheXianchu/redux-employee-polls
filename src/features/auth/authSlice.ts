import {  createSlice } from '@reduxjs/toolkit';
import { User } from "../../types/User";
import { store } from "../../app/store";

export interface AuthState {
    userId?: string;
    authenticated: boolean;
}

const initialState: AuthState = {
    userId: undefined,
    authenticated: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        authenticate: (state) => {
            const { users } = store.getState();
            state.authenticated = users.users.some((user: User) => user.id === state.userId);
        }
    },
});

export const { } = authSlice.actions;

export default authSlice.reducer;
