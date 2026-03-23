import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";
import type { LoginRequest, LoginResponse } from "./authTypes";

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    // const response = await axiosInstance.post<LoginResponse>(
    //   "/api/login",
    //   credentials
    // );
    // if (response.status !== 200) {
    //   return rejectWithValue("Invalid credentials");
    // }
    // return response.data;
    //return await response.json();
    const response = await new Promise<LoginResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          accessToken: "1234567890",
          refreshToken: "1234567890",
          isAuthenticated: true,
          user: {
            id: 1,
            name: "John Doe",
            role: "admin",
            inceptionDate: "28-MAR '16",
          },
        });
      }, 1000);
    });

    return response;
  } catch (error) {
    return rejectWithValue("Network error");
  }
});
