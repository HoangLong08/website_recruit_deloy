import { createSlice } from '@reduxjs/toolkit';
import { getAllCityAction, getAllDistrictByIdCityAction } from '../actions/address';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    city: {
      data: {},
      load: false,
      error: ''
    },
    listDistrict: {
      data: {},
      load: false,
      error: ''
    }
  },
  reducers: {},

  extraReducers: {
    [getAllCityAction.pending]: state => {
      state.city.load = true;
      state.city.data = {};
      state.city.error = '';
    },
    [getAllCityAction.fulfilled]: (state, action) => {
      state.city.load = false;
      state.city.data = action.payload;
      state.city.error = '';
    },
    [getAllCityAction.rejected]: (state, action) => {
      state.city.load = false;
      state.city.error = action.payload.error;
      state.city.data = {};
    },

    // ----------------------

    [getAllDistrictByIdCityAction.pending]: state => {
      state.listDistrict.load = true;
      state.listDistrict.data = {};
      state.listDistrict.error = '';
    },
    [getAllDistrictByIdCityAction.fulfilled]: (state, action) => {
      state.listDistrict.load = false;
      state.listDistrict.data = action.payload;
      state.listDistrict.error = '';
    },
    [getAllDistrictByIdCityAction.rejected]: (state, action) => {
      state.listDistrict.load = false;
      state.listDistrict.error = action.payload.error;
      state.listDistrict.data = {};
    }
  }
});

export default addressSlice.reducer;
