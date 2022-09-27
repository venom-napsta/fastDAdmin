import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Profiler } from 'react';

const baseURL = 'http://194.163.132.169:5000';

// Users Get
export const login = createAsyncThunk(
  'users/Login',
  async ({ rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseURL}/users}`);
      return res.data;
    } catch (error) {
      console.log(error);
      // toast ..
      return rejectWithValue(error);
    }
  }
);

// Get User /user GET
export const getUserProfile = createAsyncThunk(
  'get/UserProfile',
  async ({ rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseURL}/profile`);
      return response.data;
    } catch (error) {
      console.log('Request Error', error.message);
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
    isAuthD: false,
    loading: false,
    error: null,
  },
  reducers: {
    getUserProfile: (state) => {
      state.user = JSON.parse(localStorage.getItem('fastd_auth_token'));
    },
  },
  extraReducers: {
    [getUserProfile.pending]: (state, action) => {
      state.loading = true;
    },
    [getUserProfile.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = { email: 'napsta@nap.sta' };
      // state.user = action.payload;
    },
    [getUserProfile.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export const { logout, loginStatus, loginStatusChange } = authSlice.actions;
export default authSlice.reducer;
