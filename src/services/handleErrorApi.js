import { openNotificationWithIcon } from 'utils';

const handleError = error => {
  if (error) {
    console.log('error of file handle error api');
  } else {
    console.log('error of file handle error api');
  }
};

export const errorException = error => {
  const statusCode = error.response?.status || error.message;
  switch (statusCode) {
    case 400:
      openNotificationWithIcon('error', error.response?.data?.msg);
      break;

    case 401:
      openNotificationWithIcon('error', error.response?.data?.msg);
      break;

    case 403:
      console.log('403');
      break;

    case 404:
      // window.location.href = '/404';
      break;

    case 422:
      handleError(error.response?.data);
      break;

    case 500:
      openNotificationWithIcon('error', 'Lỗi từ server');
      // window.location.href = '/500';
      break;
    case 'Network Error':
      openNotificationWithIcon('error', error.message);
      break;
    case 'timeout of 55000ms exceeded':
      openNotificationWithIcon('error', error.message);
      break;
    default:
      console.log('');
      break;
  }

  return Promise.reject(error.response?.data);
};
