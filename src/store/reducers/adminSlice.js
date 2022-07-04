import { createSlice } from '@reduxjs/toolkit';
import { getListCandidateAction, getListRecruitAction, getListApprovePostAction } from '../actions/admin';

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    listRecruit: {
      data: [],
      load: false,
      error: ''
    },
    listCandidate: {
      data: [],
      load: false,
      error: ''
    },

    listApprovePost: {
      data: [],
      load: false,
      error: ''
    }
  },
  reducers: {},

  extraReducers: {
    [getListCandidateAction.pending]: state => {
      state.listCandidate.load = true;
      state.listCandidate.data = [];
      state.listCandidate.error = '';
    },
    [getListCandidateAction.fulfilled]: (state, action) => {
      state.listCandidate.load = false;
      state.listCandidate.data = action.payload.data;
      state.listCandidate.error = '';
    },
    [getListCandidateAction.rejected]: (state, action) => {
      state.listCandidate.load = false;
      state.listCandidate.error = action.payload.error;
      state.listCandidate.data = [];
    },

    // ---------------------------

    [getListRecruitAction.pending]: state => {
      state.listRecruit.load = true;
      state.listRecruit.data = [];
      state.listRecruit.error = '';
    },
    [getListRecruitAction.fulfilled]: (state, action) => {
      state.listRecruit.load = false;
      state.listRecruit.data = action.payload.data;
      state.listRecruit.error = '';
    },
    [getListRecruitAction.rejected]: (state, action) => {
      state.listRecruit.load = false;
      state.listRecruit.error = action.payload.error;
      state.listRecruit.data = [];
    },

    // ---------------------------

    [getListApprovePostAction.pending]: state => {
      state.listApprovePost.load = true;
      state.listApprovePost.data = [];
      state.listApprovePost.error = '';
    },
    [getListApprovePostAction.fulfilled]: (state, action) => {
      state.listApprovePost.load = false;
      state.listApprovePost.data = action.payload.data;
      state.listApprovePost.error = '';
    },
    [getListApprovePostAction.rejected]: (state, action) => {
      state.listApprovePost.load = false;
      state.listApprovePost.error = action.payload.error;
      state.listApprovePost.data = [];
    }
  }
});

export default adminSlice.reducer;
