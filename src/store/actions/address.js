import { createAsyncThunk } from '@reduxjs/toolkit';
import address from 'store/api/address';

const getAllCityAction = createAsyncThunk('address/getAllCityAction', async (params, thunkAPI) => {
  try {
    const res = await address.getAllCity().then(response => {
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

const getAllDistrictAction = createAsyncThunk('address/getAllDistrictAction', async (params, thunkAPI) => {
  try {
    const res = await address.getAllCity().then(response => {
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

const getAllDistrictByIdCityAction = createAsyncThunk(
  'address/getAllDistrictByIdCityAction',
  async (params, thunkAPI) => {
    try {
      const { idCity } = params;
      const res = await address.getAllDistrictByIdCityApi(idCity).then(response => {
        if (response) {
          return response;
        }
        return {};
      });
      return res;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'get error' });
    }
  }
);

export { getAllCityAction, getAllDistrictAction, getAllDistrictByIdCityAction };
