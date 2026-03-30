// TODO: This slice is currently unused. Auth is managed via AuthContext.
// Evaluate whether to migrate AuthContext to this slice or remove this file.
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('authToken'),
  isAuthenticated: !!localStorage.getItem('authToken'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
      if (action.payload) {
        localStorage.setItem('authToken', action.payload);
      } else {
        localStorage.removeItem('authToken');
      }
    },
    clearAuth(state) {
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    },
  },
});

export const { setToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
