/* eslint-disable no-unused-vars */
import instance from 'config/axiosClient';
import authHeader from 'services/authHeader';

const specialized = {
  search(nameSpecialized) {
    const url = '/api/specialized/search';
    return instance.post(url, {
      specialized_name: nameSpecialized
    });
  }
};

export default specialized;
