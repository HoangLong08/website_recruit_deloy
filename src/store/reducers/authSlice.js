import { createSlice } from '@reduxjs/toolkit';
import { loginAction } from '../actions/auth';
const infoUser = JSON.parse(localStorage.getItem('infoUser'));

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    data: infoUser || {},
    isModalAuth: {
      checkLogin: false,
      inc: 0
    },
    load: false,
    error: '',
    infoAdmin: {
      data: {}
    }
  },
  reducers: {
    checkLogin: (state, action) => {
      const { inc, checkLogin } = action.payload;
      state.isModalAuth.checkLogin = checkLogin;
      state.isModalAuth.inc = inc;
    }
  },

  extraReducers: {
    [loginAction.pending]: state => {
      state.load = true;
      state.data = {};
      state.error = '';
    },
    [loginAction.fulfilled]: (state, action) => {
      state.load = false;
      if (action.payload?.data) {
        state.isModalAuth.checkLogin = true;
        localStorage.setItem('infoUser', JSON.stringify(action.payload.data));
        if (action.payload.data?.info?.[0]?.user_id_role === 3) {
          window.location.href = '/admin/tong-quan';
        } else {
          window.location.href = '/';
        }
      }

      state.data = action.payload.data;
      state.error = '';
    },
    [loginAction.rejected]: (state, action) => {
      state.load = false;
      state.error = action.payload.error;
      state.data = {};
    }
  }
});

export const { checkLogin } = authSlice.actions;

export default authSlice.reducer;
