import { createAsyncThunk } from '@reduxjs/toolkit';
import admin from 'store/api/admin';
import { createAlert } from 'store/reducers/notificationSlice';

const getListCandidateAction = createAsyncThunk('admin/getListCandidateAction', async (params, thunkAPI) => {
  try {
    const res = await admin.getListCandidateApi().then(response => {
      if (response) {
        return response;
      }
      return {};
    });
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const getListRecruitAction = createAsyncThunk('admin/getListRecruitAction', async (params, thunkAPI) => {
  try {
    const res = await admin.getListRecruitApi().then(response => {
      if (response) {
        return response;
      }
      return {};
    });
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const blockOrUnblockAction = createAsyncThunk('admin/blockOrUnblockAction', async (params, thunkAPI) => {
  try {
    const { idRole, idUser } = params;
    const res = await admin.blockOrUnblockApi(idUser).then(response => {
      if (response) {
        if (idRole === '1') {
          // candidate
          thunkAPI.dispatch(getListCandidateAction());
        } else {
          thunkAPI.dispatch(getListRecruitAction());
        }
        return response;
      }
      return {};
    });
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const getListApprovePostAction = createAsyncThunk('admin/getListApprovePostAction', async (params, thunkAPI) => {
  try {
    const { orderBy } = params;
    const res = await admin.getListApproveApi(orderBy).then(response => {
      if (response) {
        return response;
      }
      return {};
    });
    return res;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const approvePostAction = createAsyncThunk('admin/approvePostAction', async (params, thunkAPI) => {
  try {
    const { idPost } = params;
    const res = await admin.approvePostApi(idPost).then(response => {
      if (response) {
        thunkAPI.dispatch(
          createAlert({
            message: 'Cập nhật thành công',
            type: 'success'
          })
        );
        return response;
      }
      return {};
    });
    return res;
  } catch (error) {
    thunkAPI.dispatch(
      createAlert({
        message: 'Cập nhật thất bại',
        type: 'error'
      })
    );
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

export {
  getListCandidateAction,
  getListRecruitAction,
  blockOrUnblockAction,
  getListApprovePostAction,
  approvePostAction
};
