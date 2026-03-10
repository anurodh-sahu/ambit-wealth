import {
  createSlice,
  asyncThunkCreator,
  PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
//import { loginUser } from "@/features/auth/services/auth.service";
//import { LoginPayload, LoginResponse } from "@/features/auth/types";
import { loginUser } from "@/store/features/auth/authThunk";
import { AuthState } from "@/store/features/auth/authTypes";
import { User } from "./authTypes";
export const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An unknown error occurred";
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
