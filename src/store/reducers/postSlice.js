import { createSlice } from '@reduxjs/toolkit';
import { getAllPostAction, getDetailPostAction } from '../actions/post';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    listPost: {
      data: {},
      load: false,
      error: ''
    },

    detailPost: {
      data: {},
      load: false,
      error: ''
    }
  },
  reducers: {},

  extraReducers: {
    [getAllPostAction.pending]: state => {
      state.listPost.load = true;
      state.listPost.data = {};
      state.listPost.error = '';
    },
    [getAllPostAction.fulfilled]: (state, action) => {
      state.listPost.load = false;
      state.listPost.data = action.payload;
      state.listPost.error = '';
    },
    [getAllPostAction.rejected]: (state, action) => {
      state.listPost.load = false;
      state.listPost.error = action.payload.error;
      state.listPost.data = {};
    },

    // ---------------

    [getDetailPostAction.pending]: state => {
      state.detailPost.load = true;
      state.detailPost.data = {};
      state.detailPost.error = '';
    },
    [getDetailPostAction.fulfilled]: (state, action) => {
      state.detailPost.load = false;
      state.detailPost.data = action.payload;
      state.detailPost.error = '';
    },
    [getDetailPostAction.rejected]: (state, action) => {
      state.detailPost.load = false;
      state.detailPost.error = action.payload.error;
      state.detailPost.data = {};
    }
  }
});

export default postSlice.reducer;
