import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import http from '../../services/httpService';

export const registerUser = createAsyncThunk(
  'auth/register',
  async (
    {
      firstname,
      lastname,
      email,
      phone_number,
      password,
      password_confirmation,
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await http.post('/auth/admin/sign-up', {
        firstname,
        lastname,
        email,
        phone_number,
        password,
        password_confirmation,
      });
      const { data } = res;
      if (data) {
        console.log('Res Data', data);
      }
      console.log('User Res No data', data);
      return data;
    } catch (error) {
      console.log('Redux Res', error.response.data.errors[0].msg);
      toast(
        `Error! ${
          error.response.message
            ? error.response.message
            : error.response.data.errors[0].msg
        }`
      );
      return rejectWithValue(
        error.response.message
          ? error.response.message
          : error.response.data.errors[0].msg
      );
    }
  }
);

// User /login Post
export const login = createAsyncThunk(
  'auth/Login',
  async ({ contact: phone_number, password }, { rejectWithValue }) => {
    try {
      const res = await http.post('/auth/admin/login', {
        phone_number,
        password,
      });
      const { data } = res;
      if (data) {
        console.log('Data Inside', data);
      }
      console.log('User Res', data);
      return data;
    } catch (error) {
      console.error('err', error);
      return rejectWithValue(error);
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
    regErr: '',
  },
  reducers: {
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
      localStorage.setItem('user', JSON.stringify(payload.data.user));
      localStorage.setItem(
        'userToken',
        JSON.stringify(payload.data.token.access_token)
      );
      state.userInfo = payload.data.user;
      window.location = '/';
    },
    [login.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // Register User
    [registerUser.pending]: (state) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.registeredUser = payload.data;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.regErr = payload;
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

// const options = {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   // referrerPolicy: 'unsafe_url',
//   body: JSON.stringify({ phone_number, password }),
// };

// const res = await fetch('/auth/admin/login', options);

// const data = await res.json();
// console.log('Data', data.success);
// if (data.success === true) {
//   console.log('Data', data);
//   return data;
// } else if (data.success === false) {
//   toast(`Error: ${data.errors.message}`);
//   return rejectWithValue(data.errors.message);
// } else if (!res.ok) {
//   console.error(data);
//   toast('Unexpected Error Occurred, Please try again');
//   return rejectWithValue(data);
// }
