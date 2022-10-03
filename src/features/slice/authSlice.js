import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import http from '../../services/httpService';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  crossdomain: true,
  withCredentials: true,
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    { firstname, lastname, email, contact, password, password_confirmation },
    { rejectWithValue }
  ) => {
    try {
      const res = await http.post(
        'sign-up/admin',
        {
          firstname,
          lastname,
          email,
          contact,
          password,
          password_confirmation,
        },
        config
      );
      const { data } = res;
      if (data) {
        console.log('Res Data', data);
      }
      console.log('User Res No data', data);
      return data;
    } catch (error) {
      console.log('Redux Res', error.response.data.errors[0].msg);
      toast(`Bammer! ${error.response.data.errors[0].msg}`);
      return rejectWithValue(error.response.message);
    }
  }
);

// Add User /login Post
export const login = createAsyncThunk(
  'auth/Login',
  async ({ contact, password }, { rejectWithValue }) => {
    try {
      const res = await http.post(
        '/login',
        {
          contact,
          password,
        },
        config
      );
      const { data } = res;
      if (data) {
        console.log('Data', data);
        localStorage.setItem('user', JSON.stringify(data.data.user));
        localStorage.setItem(
          'userToken',
          JSON.stringify(data.data.token.access_token)
        );
      }
      console.log('User Res', data);
      return data;
    } catch (error) {
      console.log('Redux Res', error.response.data.errors[0].msg);
      toast(`Bammer! ${error.response.data.errors[0].msg}`);
      return rejectWithValue(error.response.message);
    }
  }
);

// Get User Profile /profile GET
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (arg, { getState, rejectWithValue }) => {
    try {
      // get user data from store
      // const { userToken } = getState();

      const { data } = await http.get(`/profile`);
      return data;
    } catch (error) {
      console.log('Request Error', error.message);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const userToken = JSON.parse(localStorage.getItem('userToken'));
const userInfo = JSON.parse(localStorage.getItem('user'));

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    userInfo: userInfo ? userInfo : {},
    userToken: userToken ? userToken : null,
    loading: false,
    error: null,
    registeredUser: null,
  },
  reducers: {
    /* 
    reset: (state) => {
      state.error = null;
      state.loading = false;
    }, */
    logout: (state, action) => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('user');
      window.location = '/login';
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload.data.user;
      state.userToken = payload.data.token.token;
      state.isAuthD = true;
      window.location = '/';
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isAuthD = false;
      state.error = payload;
    },

    // Register User
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.registeredUser = payload;
    },
    [registerUser.rejected]: (state, { payload }) => {
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
