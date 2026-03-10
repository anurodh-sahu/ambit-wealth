import { createAsyncThunk } from "@reduxjs/toolkit";
import type { LoginRequest, LoginResponse } from "./authTypes";

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    // const response = await fetch("/api/login", {
    //   method: "POST",
    //   body: JSON.stringify(credentials),
    // });

    // if (!response.ok) {
    //   return rejectWithValue("Invalid credentials");
    // }

    // return await response.json();
    const response = await new Promise<LoginResponse>((resolve) => {
      setTimeout(() => {
        resolve({
          accessToken: "1234567890",
          refreshToken: "1234567890",
          user: {
            id: 1,
            name: "John Doe",
            role: "admin",
          },
        });
      }, 1000);
    });

    return response;
  } catch (error) {
    return rejectWithValue("Network error");
  }
});
