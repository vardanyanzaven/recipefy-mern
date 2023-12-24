import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store';

type UserState = {
    isLoggedIn?: boolean,
    username: string,
    email: string,
};

const initialState: UserState = {
    isLoggedIn: false,
    username: "",
    email: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserState(state, {payload}: PayloadAction<UserState>) {
            const {username, email} = payload;
            state.isLoggedIn = true;
            state.username = username;
            state.email = email;
        }
    }
});

export const {setUserState} = userSlice.actions;

export default userSlice.reducer;