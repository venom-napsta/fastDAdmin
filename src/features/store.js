import { configureStore } from '@reduxjs/toolkit';
// import ReduxLogger from 'redux-logger';

// middleware
import api from './middleware/api';
import toastify from './middleware/toastify';
import logger from './middleware/logger';
import authSlice from '../features/slice/authSlice';

export default configureStore({
  reducer: {
    // app: authReducer,
    user: authSlice,
  },

  middleware: [
    // (getDefaultMiddleware) => getDefaultMiddleware().concat(ReduxLogger),
    api,
    logger,
    toastify,
  ],
});
