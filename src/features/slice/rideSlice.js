import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../services/httpService';

// Get All Rides /rides  GET
export const getAllRides = createAsyncThunk(
  'driver/getAllRides',
  async (id = null, { rejectWithValue }) => {
    try {
      const res = await http.get(`/rides`);
      console.log('res drvr', res.data);
      return res.data;
    } catch (error) {
      console.log('Get Rides Redux Err', error);
      return rejectWithValue(error.response.data.errors.message);
    }
  }
);

const rideSlice = createSlice({
  name: 'rides',
  initialState: {
    rides: [],
    loading: false,
    error: null,
  },
  reducers: {
    saveRides(state, { payload }) {
      state.rides = payload;
    },
  },
  extraReducers: {
    // get drivers
    [getAllRides.pending]: (state) => {
      state.loading = true;
    },
    [getAllRides.fulfilled]: (state, action) => {
      state.loading = false;
      state.rides = action.payload[0];
      // state.rides = action.payload; //for real data
    },
    [getAllRides.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { saveRides } = rideSlice.actions;
export default rideSlice.reducer;
