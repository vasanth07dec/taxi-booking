import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { User } from '../../types';

interface AuthState {
  user: User | null;
  token: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: 'idle',
  error: null,
};

// Mock API calls for demonstration
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: { email: string; password: string }) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Mock users for different roles
    const users: Record<string, User> = {
      'customer@example.com': {
        id: '1',
        name: 'John Customer',
        email: 'customer@example.com',
        phone: '123-456-7890',
        role: 'customer',
      },
      'driver@example.com': {
        id: '2',
        name: 'Dave Driver',
        email: 'driver@example.com',
        phone: '123-456-7891',
        role: 'driver',
      },
      'owner@example.com': {
        id: '3',
        name: 'Oliver Owner',
        email: 'owner@example.com',
        phone: '123-456-7892',
        role: 'owner',
      },
      'admin@example.com': {
        id: '4',
        name: 'Alice Admin',
        email: 'admin@example.com',
        phone: '123-456-7893',
        role: 'admin',
      },
    };

    if (users[email] && password === 'password') {
      return { user: users[email], token: 'mock-jwt-token' };
    }
    
    throw new Error('Invalid credentials');
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return true;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.status = 'idle';
      });
  },
});

export default authSlice.reducer;