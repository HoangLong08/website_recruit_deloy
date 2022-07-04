import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginAction } from 'store/actions/auth';
import { isEmpty } from 'lodash';
import Input from 'components/Input';
import Button from 'components/Button';
import { createAlert } from 'store/reducers/notificationSlice';

function FormLogin({ type }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [infoLogin, setInfoLogin] = useState({
    email: '',
    password: ''
  });

  const [errLogin, setErrLogin] = useState({
    email: '',
    password: ''
  });

  const handleChangeLogin = e => {
    const { name, value } = e.target;
    setInfoLogin({
      ...infoLogin,
      [name]: value
    });
  };

  const handleSubmitLogin = async () => {
    let isValid = true;
    const newError = {
      email: '',
      password: ''
    };

    if (infoLogin.email.length === 0) {
      isValid = false;
      newError.email = 'Enter email';
    } else if (!/.+@.+\.[A-Za-z]+$/.test(infoLogin.email)) {
      isValid = false;
      newError.email = 'Invalid email';
    } else {
      newError.email = '';
    }

    if (infoLogin.password.length === 0) {
      isValid = false;
      newError.password = 'Enter password';
    } else {
      newError.password = '';
    }

    if (isValid) {
      await setLoading(true);
      const res = await dispatch(loginAction(infoLogin));
      if (!isEmpty(res.payload)) {
        await dispatch(
          createAlert({
            message: 'Đăng nhập thành công',
            type: 'success'
          })
        );
      }
      await setLoading(false);
    }
    setErrLogin({ ...newError });
  };
  return (
    <>
      <h3 className="title-auth">Đăng nhập</h3>
      <div className="form-group">
        <Input
          className="form-control"
          titleInput="Email"
          htmlFor="email"
          typeInput="text"
          placeholder="abc@gmail.com"
          name="email"
          onChange={handleChangeLogin}
          errorInput={errLogin.email}
        />
      </div>
      <div className="form-group">
        <Input
          className="form-control"
          titleInput="Mật khẩu"
          htmlFor="password"
          typeInput="text"
          placeholder="Mật khẩu"
          name="password"
          onChange={handleChangeLogin}
          errorInput={errLogin.password}
        />
      </div>
      {loading && <Button content="Loading ..." className="btn-full-width" />}
      {!loading && <Button content="Đăng nhập" className="btn-full-width" onclick={handleSubmitLogin} />}
      {isEmpty(type) && (
        <>
          <div className="d-flex align-items-center or-auth">
            <hr /> Hoặc <hr />
          </div>
          {/* <div className="wrapper-form-action">
            <Button content="Google" className="btn-full-width btn-google" />
            <Button content="Facebook" className="btn-full-width btn-facebook" />
          </div> */}
          <div className="d-flex justify-content-space-between more-auth">
            <p>
              Bạn chưa có tài khoản?{' '}
              <Link to="/dang-ky">
                <span>Đăng ký ngay</span>
              </Link>
            </p>
            <Link to="/quen-mat-khau" className="link-forgot-pass">
              Quên mật khẩu
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default FormLogin;
