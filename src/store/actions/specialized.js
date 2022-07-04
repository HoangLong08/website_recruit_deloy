import { createAsyncThunk } from '@reduxjs/toolkit';
import specialized from 'store/api/specialized';

const getSpecializeAction = createAsyncThunk('specialized/getSpecializeAction', async (params, thunkAPI) => {
  try {
    const { nameSpecialized } = params;
    const res = await specialized.search(nameSpecialized).then(response => {
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

export { getSpecializeAction };
