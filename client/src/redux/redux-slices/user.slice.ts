import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { UserData, UserState } from "@typings/auth";

const initialState: UserState = {
  isLoggedIn: false,
  username: "",
  email: "",
  age: null,
  calories: null,
  diets: [],
  savedRecipes: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserData>) {
      return { ...payload, isLoggedIn: true };
    },
    logoutUser() {
      return initialState;
    },
    setSavedRecipes(state, { payload }: PayloadAction<string[]>) {
      state.savedRecipes = payload;
    },
  },
});

export const { setUser, logoutUser, setSavedRecipes } = userSlice.actions;

export default userSlice.reducer;
