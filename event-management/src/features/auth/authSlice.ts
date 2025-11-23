// src/features/auth/authSlice.ts
import { createSlice } from '@reduxjs/toolkit';

export type UserRole = 'admin' | 'reader';

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  email: string | null;
  role: UserRole | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  email: null,
  role: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    //TODO Placeholder login/logout 
  },
});

export default authSlice.reducer;