import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../services/httpService';

// Get Users
export const getAllCustomers = createAsyncThunk(
  'users/getAllCustomers',
  async (arg, { rejectWithValue }) => {
    try {
      const res = await http.get(`/customers`);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: 'customers',
  initialState: {
    customers: [],
    loading: false,
    error: null,
  },
  reducers: {
    // filter users
    filterCustomers(state, { payload }) {
      const updatedCustomers = state.customers.map((cus) =>
        cus._id === payload._id ? payload : cus
      );
      state.users = updatedCustomers;
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
    [getAllCustomers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllCustomers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [getAllCustomers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { filterCustomers, searchUserProfile } = userSlice.actions;
export default userSlice.reducer;