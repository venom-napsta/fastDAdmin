import { configureStore } from '@reduxjs/toolkit';
// import ReduxLogger from 'redux-logger';

// middleware
// import api from './middleware/api';
// import toastify from './middleware/toastify';
// import logger from './middleware/logger';
import authSlice from '../features/slice/authSlice';
import userSlice from './slice/userSlice';
import driverSlice from './slice/driverSlice';
import transactionSlice from './slice/transactionSlice';
import customerSlice from './slice/customerSlice';
import logger from 'redux-logger';

export default configureStore({
  reducer: {
    auth: authSlice,
    users: userSlice,
    driver: driverSlice,
    trans: transactionSlice,
    customer: customerSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(logger),

  // middleware: [
  //   // (getDefaultMiddleware) => getDefaultMiddleware().concat(ReduxLogger),
  //   api,
  //   logger,
  //   toastify,
  // ],
});
