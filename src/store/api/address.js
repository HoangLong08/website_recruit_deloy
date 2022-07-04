import instance from 'config/axiosClient';

const address = {
  getAllCity() {
    const url = '/api/city/all';
    return instance.get(url);
  },

  getAllDistrictByIdCityApi(_idCity) {
    const url = '/api/district/' + _idCity + '/city';
    return instance.get(url);
  }
};

export default address;
