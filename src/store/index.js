import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/authSlice';
import notificationSlice from './reducers/notificationSlice';
import jobSlice from './reducers/jobSlice';
import companySlice from './reducers/companySlice';
import candidateSlice from './reducers/candidateSlice';
import addressSlice from './reducers/addressSlice';
import specializedSlice from './reducers/specializedSlice';
import postSlice from './reducers/postSlice';
import adminSlice from './reducers/adminSlice';

const store = configureStore({
  reducer: {
    authSlice,
    notificationSlice,
    jobSlice,
    companySlice,
    candidateSlice,
    addressSlice,
    specializedSlice,
    postSlice,
    adminSlice
  },
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store;
