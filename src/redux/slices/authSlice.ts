import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginThunk } from '../thunks/auth/loginThunk';
import { logoutThunk } from '../thunks/auth/logoutThunk';

interface AuthState {
  isAuthenticated: boolean;
  currentUserId: string | null;
  userName: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  currentUserId: null,
  userName: null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuthError: (state) => {
      state.error = null;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Login thunk reducers
    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.currentUserId = action.payload.current_user_login_details_id;
      state.userName = action.payload.user_fullname || action.payload.username;
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload ? String(action.payload) : 'Login failed';
    });

    // Logout thunk reducers
    builder.addCase(logoutThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.currentUserId = null;
      state.userName = null;
    });
    builder.addCase(logoutThunk.rejected, (state) => {
      state.isLoading = false;
      // Keep user logged in if logout fails
    });
  },
});

export const { resetAuthError, setUserName } = authSlice.actions;
export default authSlice.reducer;
