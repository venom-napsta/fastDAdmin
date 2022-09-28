import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../services/httpService';

// Get Users
export const getAllUsers = createAsyncThunk(
  'users/getAllUsers',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const res = await http.get(`/users/${userId}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

// // Get User /user GET
// export const getUserProfile = createAsyncThunk(
//   'users/getUserProfile',
//   async ({ rejectWithValue }) => {
//     try {
//       const response = await http.get(`/profile`);
//       return response.data;
//     } catch (error) {
//       console.log('Request Error', error.message);
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    // filter users
    filterUserProfile(state, { payload }) {
      const updatedUsers = state.users.map((user) =>
        user._id !== payload._id ? payload : user
      );
      state.users = updatedUsers;
    },

    // search user
    searchUserProfile(state, { payload }) {
      const updatedUsers = state.users.map((user) =>
        user._id === payload._id ? payload : user
      );
      state.users = updatedUsers;
    },
  },

  extraReducers: {
    [getAllUsers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { filterUserProfile, searchUserProfile } = userSlice.actions;
export default userSlice.reducer;
