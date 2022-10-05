import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import http from '../../services/httpService';
// import customerList from '../ ../assets/JsonData/customers-list.json';
import driverList from '../../assets/JsonData/drivers_list.json';
// const baseURL = 'http://194.163.132.169:5000';

// Get All Drivers /drivers  GET
export const getAllDrivers = createAsyncThunk(
  'driver/getAllDrivers',
  async (id = null, { rejectWithValue }) => {
    try {
      const res = await http.get(`/drivers`);
      console.log('res drvr', res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data.errors.message);
    }
  }
);

// Get Driver By Id /driver/":"driverId GET
export const getDriver = createAsyncThunk(
  'driver/getDriverById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await http.get(`/drivers/${id}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Add Driver Veichles ---> driver/":"driverId/vehicles POST
export const addDriver = createAsyncThunk(
  'driver/addDriverVehicles',
  async ({ driverId, data }, { rejectWithValue }) => {
    try {
      const res = await http.post(`/drivers/${driverId}/vehicles}`, {
        driverId,
        data,
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Driver Vehicles By Id /driver/":"driverId GET
export const getDriverVehicles = createAsyncThunk(
  'driver/getDriverVehicles',
  async ({ driverId }, { rejectWithValue }) => {
    try {
      const res = await http.get(`/drivers/${driverId}/vehicles}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDriverDocuments = createAsyncThunk(
  'driver/getDriverDocuments',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await http.get(`/driver/${id}/documents}`);
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const driverSlice = createSlice({
  name: 'drivers',
  initialState: {
    driver: {},
    // drivers: [],
    drivers: driverList,
    documents: [],
    loading: false,
    error: null,
  },
  reducers: {
    saveDrivers(state, { payload }) {
      state.drivers = payload;
    },
    // Delete Driver
    deleteDriver(state, { payload }) {
      state.drivers = state.drivers.filter((item) => item.id !== payload);
    },
    // search driver
    searchDriver(state, { payload }) {
      const updatedDrivers = state.drivers.map((drvr) =>
        drvr._id === payload._id ? payload : state.drivers
      );
      state.drivers = updatedDrivers;
    },
  },
  extraReducers: {
    // get drivers
    [getAllDrivers.pending]: (state) => {
      state.loading = true;
    },
    [getAllDrivers.fulfilled]: (state, action) => {
      state.loading = false;
      state.drivers = action.payload;
    },
    [getAllDrivers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get driver
    [getDriver.pending]: (state) => {
      state.loading = true;
    },
    [getDriver.fulfilled]: (state, action) => {
      state.loading = false;
      state.driver = action.payload;
    },
    [getDriver.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // add driver
    [addDriver.pending]: (state) => {
      state.loading = true;
    },
    [addDriver.fulfilled]: (state, action) => {
      state.loading = false;
      state.driver = action.payload;
    },
    [addDriver.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get driver vehicles
    [getDriverVehicles.pending]: (state) => {
      state.loading = true;
    },
    [getDriverVehicles.fulfilled]: (state, action) => {
      state.loading = false;
      state.driver = action.payload;
    },
    [getDriverVehicles.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get driver documents
    [getDriverDocuments.pending]: (state) => {
      state.loading = true;
    },
    [getDriverDocuments.fulfilled]: (state, action) => {
      state.loading = false;
      state.documents = action.payload;
    },
    [getDriverDocuments.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { searchDriver, saveDrivers } = driverSlice.actions;
export default driverSlice.reducer;
