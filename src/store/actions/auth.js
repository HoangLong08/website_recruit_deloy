import { createAsyncThunk } from '@reduxjs/toolkit';
import { createAlert } from 'store/reducers/notificationSlice';
import auth from 'store/api/auth';

const loginAction = createAsyncThunk('auth/loginAction', async (params, thunkAPI) => {
  try {
    const { email, password } = params;

    const dataLogin = await auth.login(email, password).then(response => {
      if (response) {
        return response;
      }
      return {};
    });
    return dataLogin;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'get error' });
  }
});

const registerAction = createAsyncThunk('auth/registerAction', async (params, thunkAPI) => {
  try {
    const { email, fullName, password, rules } = params;

    const dataLogin = await auth.register(email, fullName, password, rules).then(response => {
      if (response) {
        thunkAPI.dispatch(
          createAlert({
            message: 'Đăng ký thành công',
            type: 'success'
          })
        );
        window.location.href = '/dang-nhap';
        return response;
      }
      return {};
    });
    return dataLogin;
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: 'Đăng ký thất bại' });
  }
});

const forgotPasswordAction = createAsyncThunk('auth/forgotPasswordAction', async (params, thunkAPI) => {
  try {
    const { email } = params;
    const res = await auth.forgotPassword(email).then(response => {
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

const submitOtpAction = createAsyncThunk('auth/submitOtpAction', async (params, thunkAPI) => {
  try {
    const { otp } = params;
    const res = await auth.submitOtp(otp).then(response => {
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

export { loginAction, registerAction, forgotPasswordAction, submitOtpAction };
