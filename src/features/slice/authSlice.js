import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import http from '../../services/httpService';

export const login = createAsyncThunk(
  'auth/Login',
  async ({ email, password }, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await http.post(
        'auth/login',
        {
          email,
          password,
        },
        config
      );
      console.log('User Res', data);
      localStorage.setItem('user', JSON.stringify(data));
      return data;
    } catch (error) {
      console.log('Redux Res', error);
      toast(`Bammer! ${error.response.data.errors.message}`);
      return rejectWithValue(error.response.data.errors.message);
    }
  }
);

// Get User Profile /profile GET
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      const { user } = getState();
      // config headers
      const config = {
        headers: {
          Authorization: `Bearer ${user.userToken}`,
        },
      };
      const { data } = await http.get(`/profile`, config);
      return data;
    } catch (error) {
      console.log('Request Error', error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

// initialize userToken from local storage
// const userToken = localStorage.getItem('userToken')
//   ? localStorage.getItem('userToken')
//   : null
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: {},
    isAuthD: false,
    loading: false,
    error: null,
  },
  reducers: {
    loginStatus: (state) => {
      state.user = JSON.parse(localStorage.getItem('fastd_auth_token'));
    },
    logout: (state, action) => {
      state.isAuthD = false;
      // window.location.pathname = '/login';
      // localStorage.removeItem('token');
    },
    // fake login
    loginStatusChange: (state, action) => {
      state.isAuthD = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.isAuthD = true;
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // get user profile
    [getUserProfile.pending]: (state) => {
      state.loading = true;
    },
    [getUserProfile.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [getUserProfile.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const { logout, loginStatus, loginStatusChange } = authSlice.actions;
export default authSlice.reducer;
