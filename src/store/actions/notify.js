import { createAsyncThunk } from '@reduxjs/toolkit';
import notify from 'store/api/notify';

const getAllNotifyAction = createAsyncThunk('notify/getAllNotifyAction', async (params, thunkAPI) => {
  try {
    const res = await notify.getAllNotifyApi().then(response => {
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

export { getAllNotifyAction };
