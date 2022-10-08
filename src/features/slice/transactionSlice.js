import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../services/httpService';

const body = [
  {
    id: '#OD1711',
    user: 'john doe',
    country: 'za',
    date: '17 Jun 2021 - 17:30',
    price: '$900',
    method: 'cash',
    status: 'enroute',
  },
  {
    id: '#OD1712',
    user: 'frank iva',
    country: 'zw',
    date: '1 Jun 2021 - 02:33',
    price: '$400',
    method: 'transfer',
    status: 'processing',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'zw',
    date: '27 Jun 2021 - 11:20',
    price: '$200',
    method: 'transfer',
    status: 'pending',
  },
  {
    id: '#OD1712',
    user: 'frank iva',
    country: 'za',
    date: '1 Jun 2021 - 15:10',
    price: '$400',
    method: 'cash',
    status: 'processing',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'za',
    date: '27 Jun 2021 - 00:28',
    price: '$200',
    method: 'transfer',
    status: 'refund',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'zw',
    date: '27 Jun 2021 - 11:20',
    price: '$200',
    method: 'transfer',
    status: 'pending',
  },
  {
    id: '#OD1712',
    user: 'frank iva',
    country: 'zw',
    date: '1 Jun 2021 - 15:10',
    price: '$400',
    method: 'cash',
    status: 'processing',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'zw',
    date: '27 Jun 2021 - 00:28',
    price: '$200',
    method: 'transfer',
    status: 'refund',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'za',
    date: '27 Jun 2021 - 11:20',
    price: '$200',
    method: 'transfer',
    status: 'pending',
  },
  {
    id: '#OD1712',
    user: 'frank iva',
    country: 'za',
    date: '1 Jun 2021 - 15:10',
    price: '$400',
    method: 'cash',
    status: 'processing',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'za',
    date: '27 Jun 2021 - 00:28',
    price: '$200',
    method: 'transfer',
    status: 'refund',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'za',
    date: '27 Jun 2021 - 11:20',
    price: '$200',
    method: 'transfer',
    status: 'pending',
  },
  {
    id: '#OD1712',
    user: 'frank iva',
    country: 'za',
    date: '1 Jun 2021 - 15:10',
    price: '$400',
    method: 'cash',
    status: 'processing',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'zw',
    date: '27 Jun 2021 - 00:28',
    price: '$200',
    method: 'transfer',
    status: 'refund',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'za',
    date: '27 Jun 2021 - 11:20',
    price: '$200',
    method: 'transfer',
    status: 'pending',
  },
  {
    id: '#OD1712',
    user: 'frank iva',
    country: 'za',
    date: '1 Jun 2021 - 15:10',
    price: '$400',
    method: 'cash',
    status: 'processing',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'za',
    date: '27 Jun 2021 - 00:28',
    price: '$200',
    method: 'transfer',
    status: 'refund',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'za',
    date: '27 Jun 2021 - 11:20',
    price: '$200',
    method: 'transfer',
    status: 'pending',
  },
  {
    id: '#OD1712',
    user: 'frank iva',
    country: 'zw',
    date: '1 Jun 2021 - 15:10',
    price: '$400',
    method: 'cash',
    status: 'processing',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'zw',
    date: '27 Jun 2021 - 00:28',
    price: '$200',
    method: 'transfer',
    status: 'refund',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'za',
    date: '27 Jun 2021 - 11:20',
    price: '$200',
    method: 'transfer',
    status: 'pending',
  },
  {
    id: '#OD1712',
    user: 'frank iva',
    country: 'za',
    date: '1 Jun 2021 - 15:10',
    price: '$400',
    method: 'cash',
    status: 'processing',
  },
  {
    id: '#OD1713',
    user: 'anthony baker',
    country: 'za',
    date: '27 Jun 2021 - 00:28',
    price: '$200',
    method: 'transfer',
    status: 'refund',
  },
];
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
    transactions: body,
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
