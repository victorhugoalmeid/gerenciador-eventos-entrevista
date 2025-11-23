// src/features/auth/authSlice.ts
"use client";

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginRequest, User, UserRole } from "@/services/authService";

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  email: string | null;
  role: UserRole | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  email: null,
  role: null,
  loading: false,
  error: null,
};

interface LoginPayload {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      const { token, user } = await loginRequest(email, password);

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      }

      return { token, user };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Erro ao autenticar";

      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    initializeFromStorage(state) {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("token");
      const userRaw = localStorage.getItem("user");

      if (token && userRaw) {
        try {
          const user: User = JSON.parse(userRaw);
          state.isAuthenticated = true;
          state.token = token;
          state.email = user.email;
          state.role = user.role;
          state.error = null;
        } catch {
          // Se der problema no parse, limpa tudo
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      state.role = null;
      state.loading = false;
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string; user: User }>) => {
          state.loading = false;
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.email = action.payload.user.email;
          state.role = action.payload.user.role;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Não foi possível autenticar";
      });
  },
});

export const { logout, initializeFromStorage } = authSlice.actions;
export default authSlice.reducer;