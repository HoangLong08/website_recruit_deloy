import instance from 'config/axiosClient';
import authHeader from 'services/authHeader';

const notify = {
  getAllNotifyApi() {
    const url = '/api/notify';
    return instance.post(
      url,
      {
        page_size: 20,
        page_index: 1
      },
      { headers: authHeader() }
    );
  }
};

export default notify;
