import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://194.163.132.169:5000';

// Get All Drivers /drivers  GET
export const getDrivers = createAsyncThunk(
  'driver/AllDrivers',
  async ({ data }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/drivers}`, { data });
      return res.data;
    } catch (error) {
      console.log(error);
      // toast ..
      return rejectWithValue(error);
    }
  }
);

// Get Driver By Id /driver/":"driverId GET
export const getDriver = createAsyncThunk(
  'driver/DriverById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/drivers/${id}}`);
      return res.data;
    } catch (error) {
      console.log(error);
      // toast ..
      return rejectWithValue(error);
    }
  }
);

// Add Driver Veichles ---> driver/":"driverId/vehicles POST
export const addDriver = createAsyncThunk(
  'driver/addDriverVehicles',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${baseURL}/drivers/${id}/vehicles}`, {
        data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      // toast ..
      return rejectWithValue(error);
    }
  }
);

// Get Driver By Id /driver/":"driverId GET
export const getDriverVehicles = createAsyncThunk(
  'driver/getDriverVehicles',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/drivers/${id}/vehicles}`);
      return res.data;
    } catch (error) {
      console.log(error);
      // toast ..
      return rejectWithValue(error);
    }
  }
);

export const getDriverDocs = createAsyncThunk(
  'driver/getDriverVehicles',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/drivers/${id}/documents}`);
      return res.data;
    } catch (error) {
      console.log(error);
      // toast ..
      return rejectWithValue(error);
    }
  }
);

export const getDriverVehiclesId = createAsyncThunk(
  'driver/getDriverVehicles',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${baseURL}/drivers/${id}/vehicles}`);
      return res.data;
    } catch (error) {
      console.log(error);
      // toast ..
      return rejectWithValue(error);
    }
  }
);

const driverSlice = createSlice({
  name: 'driver',
  initialState: {
    driver: {},
    loading: false,
    error: null,
  },
  reducers: {
    // Reducers eg Filtering
  },
  extraReducers: {
    [getDriver.pending]: (state, action) => {
      state.loading = true;
    },
    [getDriver.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = { email: 'napsta@nap.sta' };
      // state.user = action.payload;
    },
    [getDriver.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.payload;
    },
  },
});

export const { logout, loginStatus, loginStatusChange } = driverSlice.actions;
export default driverSlice.reducer;
