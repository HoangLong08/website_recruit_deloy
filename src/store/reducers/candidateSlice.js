import { createSlice } from '@reduxjs/toolkit';
import { getListCvAction, getInfoCandidateByIdUserAction, getRecodePersonalAction } from '../actions/candidate';

const candidateSlice = createSlice({
  name: 'candidate',
  initialState: {
    data: {}, // list
    listUploadCv: [],
    load: false,
    error: '',
    infoCandidate: {
      data: {},
      load: false,
      error: ''
    },
    recordPersonal: {
      data: {},
      load: false,
      error: ''
    }
  },
  reducers: {
    addImage: (state, action) => {
      state.listUploadCv.push(action.payload);
    },

    setImageLoading: (state, action) => {
      let newArr = [];
      newArr = state.listUploadCv.map(item => {
        if (item.id === action.payload) {
          item = {
            ...item,
            loading: true
          };
        }
        return item;
      });
      state.listUploadCv = newArr;
    },

    setImageUrl: (state, action) => {
      let newArr = [];
      newArr = state.listUploadCv.map(item => {
        if (item.id === action.payload.id) {
          item = {
            ...item,
            loading: false,
            linkFile: action.payload.url
          };
        }
        return item;
      });
      state.listUploadCv = newArr;
    },

    setListCv: (state, action) => {
      state.listUploadCv = action.payload;
    }
  },

  extraReducers: {
    [getListCvAction.pending]: state => {
      state.load = true;
      state.data = {};
      state.error = '';
    },
    [getListCvAction.fulfilled]: (state, action) => {
      state.load = false;
      state.data = action.payload.data;
      state.error = '';
    },
    [getListCvAction.rejected]: (state, action) => {
      state.load = false;
      state.error = action.payload.error;
      state.data = {};
    },

    // ---------------------------
    [getInfoCandidateByIdUserAction.pending]: state => {
      state.infoCandidate.load = true;
      state.infoCandidate.data = {};
      state.infoCandidate.error = '';
    },
    [getInfoCandidateByIdUserAction.fulfilled]: (state, action) => {
      state.infoCandidate.load = false;
      state.infoCandidate.data = action.payload.data;
      state.infoCandidate.error = '';
    },
    [getInfoCandidateByIdUserAction.rejected]: (state, action) => {
      state.infoCandidate.load = false;
      state.infoCandidate.error = action.payload.error;
      state.infoCandidate.data = {};
    },

    // ---------------------------

    [getRecodePersonalAction.pending]: state => {
      state.recordPersonal.load = true;
      state.recordPersonal.data = {};
      state.recordPersonal.error = '';
    },
    [getRecodePersonalAction.fulfilled]: (state, action) => {
      state.recordPersonal.load = false;
      state.recordPersonal.data = action.payload.data;
      state.recordPersonal.error = '';
    },
    [getRecodePersonalAction.rejected]: (state, action) => {
      state.recordPersonal.load = false;
      state.recordPersonal.error = action.payload.error;
      state.recordPersonal.data = {};
    }
  }
});

export const { addImage, setImageLoading, setImageUrl, setListCv } = candidateSlice.actions;

export default candidateSlice.reducer;
