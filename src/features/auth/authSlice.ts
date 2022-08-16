import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { _getUsers } from "../../../_DATA";
import {User} from "../../types/User";

export interface AuthState {
    userId?: string;
    authenticated: boolean;
}

const initialState: AuthState = {
    userId: undefined,
    authenticated: false,
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const authenticateAsync = createAsyncThunk(
    'authenticate',
    async (userId: string) => {
        const response = await _getUsers();

        return response.find((user: User) => user.id === userId);
    }
);

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(authenticateAsync.fulfilled, (state, action) => {
            // Add user to the state array
            state.authenticated = action.payload;
        })
    }
});

export const { } = authSlice.actions;

export default authSlice.reducer;
