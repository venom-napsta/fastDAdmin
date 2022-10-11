import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../services/httpService';
import customerList from '../../assets/JsonData/customers-list.json';

// Get Users
export const getAllCustomers = createAsyncThunk(
  'users/getAllCustomers',
  async (arg, { rejectWithValue }) => {
    try {
      const res = await http.get(`/admin/customers`);
      console.log('customers res', res.data);
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
    customers: customerList,
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
  },

  extraReducers: {
    [getAllCustomers.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllCustomers.fulfilled]: (state, action) => {
      state.loading = false;
      state.customers = action.payload.data;
    },
    [getAllCustomers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { filterCustomers, searchUserProfile } = userSlice.actions;
export default userSlice.reducer;
