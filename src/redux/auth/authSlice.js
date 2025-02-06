import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { publicPost } from '../api/apiCaller';
const initialState = {
  userData: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  error: '',
  errorMessage: "",
};

export const login = createAsyncThunk('login', async (params, { rejectWithValue }) => {
  try {
    const response = await publicPost("/auth/login", params);
    return response;
  } catch (err) {
    return rejectWithValue(err.response.data.message);

  }
});

const AuthSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {logout: (state) => {
    state.userData = null,
    state.error=''
  }},
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.userData = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    });
  },
});
export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;