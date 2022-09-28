import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../services/httpService';

// Get Trans
export const getAllTrans = createAsyncThunk(
  'trans/getAlltrans',
  async ({ rejectWithValue }) => {
    try {
      const res = await http.get(`/transactions`);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

const tansSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [],
    loading: false,
    error: null,
  },
  reducers: {
    // filter Trans
    filterTrans(state, { payload }) {
      const updatedTrans = state.transactions.map((trans) =>
        trans._id !== payload._id ? payload : trans
      );
      state.transactions = updatedTrans;
    },

    // search user
    searchUserProfile(state, { payload }) {
      const updatedTrans = state.transactions.map((trans) =>
        trans._id === payload._id ? payload : trans
      );
      state.transactions = updatedTrans;
    },
  },
  extraReducers: {
    [getAllTrans.pending]: (state, action) => {
      state.loading = true;
    },
    [getAllTrans.fulfilled]: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    },
    [getAllTrans.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { filterUserProfile, searchUserProfile } = tansSlice.actions;
export default tansSlice.reducer;
