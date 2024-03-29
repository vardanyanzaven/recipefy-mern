import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserData, UserState } from "@typings/auth";

const initialState: UserState = {
  isLoggedIn: false,
  username: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserData>) {
      const { username, email } = payload;
      state.isLoggedIn = true;
      state.username = username;
      state.email = email;
    },
    logoutUser(state) {
      state.isLoggedIn = false;
      state.username = "";
      state.email = "";
    },
  },
});

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
