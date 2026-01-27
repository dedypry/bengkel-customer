import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { getProfile } from "./auth-action";

import { IUser } from "@/utils/interfaces/IUser";

const initialState = {
  token: "",
  user: null as IUser | null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },

    authClear: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) =>
    builder.addCase(
      getProfile.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      },
    ),
});

export const { setAuth, authClear, setToken } = authSlice.actions;
export default authSlice.reducer;
