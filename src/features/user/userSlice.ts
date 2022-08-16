import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { _getUsers } from "../../utils/_DATA";
import { User } from "../../types/User";

export interface UsersState {
    users: User[];
}

const initialState: UsersState = {
    users: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchUsersAsync = createAsyncThunk(
    'users/fetch',
    async () => {
        return await _getUsers();
    }
);

export const usersSlice = createSlice({
    name: 'auth',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUsersAsync.fulfilled, (state, action) => {
            // Add user to the state array
            state.users = action.payload;
        })
    }
});

export const { } = usersSlice.actions;

export default usersSlice.reducer;
