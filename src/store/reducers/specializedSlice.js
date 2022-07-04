import { createSlice } from '@reduxjs/toolkit';
import { getSpecializeAction } from '../actions/specialized';

const specializedSlice = createSlice({
  name: 'specialized',
  initialState: {
    specializes: {
      data: {},
      load: false,
      error: ''
    }
  },
  reducers: {},

  extraReducers: {
    [getSpecializeAction.pending]: state => {
      state.specializes.load = true;
      state.specializes.data = {};
      state.specializes.error = '';
    },
    [getSpecializeAction.fulfilled]: (state, action) => {
      state.specializes.load = false;
      state.specializes.data = action.payload;
      state.specializes.error = '';
    },
    [getSpecializeAction.rejected]: (state, action) => {
      state.specializes.load = false;
      state.specializes.error = action.payload.error;
      state.specializes.data = {};
    }
  }
});

export default specializedSlice.reducer;
