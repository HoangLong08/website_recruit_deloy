import instance from 'config/axiosClient';

const auth = {
  login(email, password) {
    const url = '/api/user/login';
    return instance.post(url, {
      userEmail: email,
      password: password
    });
  },

  register(email, fullName, password, rules) {
    const url = '/api/user/create';
    return instance.post(url, {
      user_name: fullName,
      user_gender: 'Nam',
      user_email: email,
      user_password: password,
      user_phone: '099999999',
      user_id_city: 48,
      user_id_district: 235,
      user_id_street: 26944,
      user_address: '99999 Lê Thanh Nghị',
      user_id_role: rules
    });
  },

  forgotPassword(email) {
    const url = '/api/user/forgot-password/' + email;
    return instance.get(url);
  },

  submitOtp(otp) {
    const url = '/api/user/forgot-password/validate/' + otp;
    return instance.get(url);
  }
};

export default auth;
