import axios from 'axios';
import { errorException } from 'services/handleErrorApi';

const instance = axios.create({
  baseURL: process.env.REACT_APP_URL_API + '',
  headers: {
    'Content-Type': 'application/json'
  }
});

instance.defaults.timeout = 55000;

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    console.log('error config: ', error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    console.log('error: ', error.message);
    errorException(error);
  }
);

export default instance;
