import { createSlice } from '@reduxjs/toolkit';
import { getCompanyAction, getDetailCompanyAction, getCompanyByIdUserAction } from '../actions/company';

const companySlice = createSlice({
  name: 'company',
  initialState: {
    listCompany: {
      data: {},
      load: false,
      error: ''
    },

    detailCompany: {
      data: {},
      load: false,
      error: ''
    },

    listCompanyByIdUser: {
      data: {},
      load: false,
      error: ''
    }
  },
  reducers: {},

  extraReducers: {
    [getCompanyAction.pending]: state => {
      state.listCompany.load = true;
      state.listCompany.data = {};
      state.listCompany.error = '';
    },
    [getCompanyAction.fulfilled]: (state, action) => {
      state.listCompany.load = false;
      state.listCompany.data = action.payload.data;
      state.listCompany.error = '';
    },
    [getCompanyAction.rejected]: (state, action) => {
      state.listCompany.load = false;
      state.listCompany.error = action.payload.error;
      state.listCompany.data = {};
    },

    // ----------------------
    [getDetailCompanyAction.pending]: state => {
      state.detailCompany.load = true;
      state.detailCompany.data = {};
      state.detailCompany.error = '';
    },
    [getDetailCompanyAction.fulfilled]: (state, action) => {
      state.detailCompany.load = false;
      state.detailCompany.data = action.payload.data;
      state.detailCompany.error = '';
    },
    [getDetailCompanyAction.rejected]: (state, action) => {
      state.detailCompany.load = false;
      state.detailCompany.error = action.payload.error;
      state.detailCompany.data = {};
    },

    // ---------------------------------------

    [getCompanyByIdUserAction.pending]: state => {
      state.listCompanyByIdUser.load = true;
      state.listCompanyByIdUser.data = {};
      state.listCompanyByIdUser.error = '';
    },
    [getCompanyByIdUserAction.fulfilled]: (state, action) => {
      state.listCompanyByIdUser.load = false;
      state.listCompanyByIdUser.data = action.payload;
      state.listCompanyByIdUser.error = '';
    },
    [getCompanyByIdUserAction.rejected]: (state, action) => {
      state.listCompanyByIdUser.load = false;
      state.listCompanyByIdUser.error = action.payload.error;
      state.listCompanyByIdUser.data = {};
    }
  }
});

export default companySlice.reducer;
