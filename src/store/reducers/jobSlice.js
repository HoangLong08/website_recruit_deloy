import { createSlice } from '@reduxjs/toolkit';
import {
  getJobAction,
  getDetailJobByIdAction,
  getListJobLoveByIdUserAction,
  getListJobApplyByIdUserAction,
  getListJobByIdCompanyAction,
  getListJobByRecruiterAction,
  getListCvByIdJobAction
} from '../actions/job';

const jobSlice = createSlice({
  name: 'job',
  initialState: {
    jobs: {
      data: {},
      load: false,
      error: ''
    },
    detailJob: {
      data: {},
      load: false,
      error: ''
    },
    loveJobs: {
      data: [],
      load: false,
      error: ''
    },
    applyJobs: {
      data: [],
      load: false,
      error: ''
    },

    listJobOfCompany: {
      data: [],
      load: false,
      error: ''
    },

    listJobByRecruiter: {
      data: [],
      load: false,
      error: ''
    },

    listCvByIdJob: {
      data: [],
      load: false,
      error: ''
    }
  },
  reducers: {
    setListJob: (state, action) => {
      const { idJob, isFavorites } = action.payload;
      const resArr = state.jobs.data?.data.map(item => {
        if (item.jd_id === idJob) {
          return {
            ...item,
            isFavorites: !isFavorites
          };
        }
        return item;
      });
      state.jobs.data = {
        ...state.jobs.data,
        data: resArr
      };
    },

    setListJobLove: (state, action) => {
      const { idJob } = action.payload;
      const resArr = state.loveJobs.data?.filter(item => item.jd_id !== idJob);
      state.loveJobs.data = resArr;
    }
  },

  extraReducers: {
    [getJobAction.pending]: state => {
      state.jobs.load = true;
      state.jobs.data = {};
      state.jobs.error = '';
    },
    [getJobAction.fulfilled]: (state, action) => {
      state.jobs.load = false;
      state.jobs.data = action.payload.data;
      state.jobs.error = '';
    },
    [getJobAction.rejected]: (state, action) => {
      state.jobs.load = false;
      state.jobs.error = action.payload.error;
      state.jobs.data = {};
    },

    // -----------------

    [getDetailJobByIdAction.pending]: state => {
      state.detailJob.load = true;
      state.detailJob.data = {};
      state.detailJob.error = '';
    },
    [getDetailJobByIdAction.fulfilled]: (state, action) => {
      state.detailJob.load = false;
      state.detailJob.data = action.payload.data;
      state.detailJob.error = '';
    },
    [getDetailJobByIdAction.rejected]: (state, action) => {
      state.detailJob.load = false;
      state.detailJob.error = action.payload.error;
      state.detailJob.data = {};
    },

    // ------------------

    [getListJobLoveByIdUserAction.pending]: state => {
      state.loveJobs.load = true;
      state.loveJobs.data = [];
      state.loveJobs.error = '';
    },
    [getListJobLoveByIdUserAction.fulfilled]: (state, action) => {
      state.loveJobs.load = false;
      state.loveJobs.data = action.payload;
      state.loveJobs.error = '';
    },
    [getListJobLoveByIdUserAction.rejected]: (state, action) => {
      state.loveJobs.load = false;
      state.loveJobs.error = action.payload.error;
      state.loveJobs.data = [];
    },

    // ----------------
    [getListJobApplyByIdUserAction.pending]: state => {
      state.applyJobs.load = true;
      state.applyJobs.data = [];
      state.applyJobs.error = '';
    },
    [getListJobApplyByIdUserAction.fulfilled]: (state, action) => {
      state.applyJobs.load = false;
      state.applyJobs.data = action.payload;
      state.applyJobs.error = '';
    },
    [getListJobApplyByIdUserAction.rejected]: (state, action) => {
      state.applyJobs.load = false;
      state.applyJobs.error = action.payload.error;
      state.applyJobs.data = [];
    },

    // ------------------
    [getListJobByIdCompanyAction.pending]: state => {
      state.listJobOfCompany.load = true;
      state.listJobOfCompany.data = [];
      state.listJobOfCompany.error = '';
    },
    [getListJobByIdCompanyAction.fulfilled]: (state, action) => {
      state.listJobOfCompany.load = false;
      state.listJobOfCompany.data = action.payload;
      state.listJobOfCompany.error = '';
    },
    [getListJobByIdCompanyAction.rejected]: (state, action) => {
      state.listJobOfCompany.load = false;
      state.listJobOfCompany.error = action.payload.error;
      state.listJobOfCompany.data = [];
    },

    // ----------------------
    [getListJobByRecruiterAction.pending]: state => {
      state.listJobByRecruiter.load = true;
      state.listJobByRecruiter.data = [];
      state.listJobByRecruiter.error = '';
    },
    [getListJobByRecruiterAction.fulfilled]: (state, action) => {
      state.listJobByRecruiter.load = false;
      state.listJobByRecruiter.data = action.payload;
      state.listJobByRecruiter.error = '';
    },
    [getListJobByRecruiterAction.rejected]: (state, action) => {
      state.listJobByRecruiter.load = false;
      state.listJobByRecruiter.error = action.payload.error;
      state.listJobByRecruiter.data = [];
    },

    // -----------------
    [getListCvByIdJobAction.pending]: state => {
      state.listCvByIdJob.load = true;
      state.listCvByIdJob.data = [];
      state.listCvByIdJob.error = '';
    },
    [getListCvByIdJobAction.fulfilled]: (state, action) => {
      state.listCvByIdJob.load = false;
      state.listCvByIdJob.data = action.payload;
      state.listCvByIdJob.error = '';
    },
    [getListCvByIdJobAction.rejected]: (state, action) => {
      state.listCvByIdJob.load = false;
      state.listCvByIdJob.error = action.payload.error;
      state.listCvByIdJob.data = [];
    }
  }
});

export const { setListJob, setListJobLove } = jobSlice.actions;

export default jobSlice.reducer;
