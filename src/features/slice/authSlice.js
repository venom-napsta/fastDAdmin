import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import http from '../../services/httpService';
// const baseURL = 'http://194.163.132.169:5000';

export const login = createAsyncThunk(
  'auth/Login',
  async ({ email, password }, { rejectWithValue }) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const { data } = await axios.post(
        '/auth/login',
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
      console.log(error);
      // toast ..
      return rejectWithValue(error);
    }
  }
);

// // Get User Profile /profile GET
// export const getUserProfile = createAsyncThunk(
//   'get/UserProfile',
//   async ({ rejectWithValue }) => {
//     try {
//       const response = await axios.get(`${baseURL}/profile`);
//       return response.data;
//     } catch (error) {
//       console.log('Request Error', error.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

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
      // state.user = null;
      // localStorage.removeItem('token');
    },
    loginStatusChange: (state, action) => {
      state.isAuthD = action.payload;
    },
  },
  extraReducers: {
    [login.pending]: (state, action) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { logout, loginStatus, loginStatusChange } = authSlice.actions;
export default authSlice.reducer;
