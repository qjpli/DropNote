import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createUser, signInUserWithUsername } from '../../services/db/authService';

// Infer return types from the actual auth functions
type AuthPayload = Awaited<ReturnType<typeof createUser>>; // Same for login

interface AuthState {
  user: AuthPayload | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const registerUser = createAsyncThunk<
  AuthPayload,
  { username: string; password: string },
  { rejectValue: string }
>('auth/registerUser', async ({ username, password }, thunkAPI) => {
  try {
    const response = await createUser(password, username);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loginUser = createAsyncThunk<
  AuthPayload,
  { username: string; password: string },
  { rejectValue: string }
>('auth/loginUser', async ({ username, password }, thunkAPI) => {
  try {
    const response = await signInUserWithUsername(username, password);
    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthPayload>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Registration failed';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthPayload>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
