import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from 'components/Input';
import Button from 'components/Button';
import SelectOption from 'components/SelectOption';
import { registerAction } from 'store/actions/auth';
import { useDispatch } from 'react-redux';
import './style.css';

const dataOption = [
  {
    id: '1',
    des: 'Ứng viên'
  },
  {
    id: '2',
    des: 'Nhà tuyển dụng'
  }
];

function FormRegister() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [infoRegister, setInfoRegister] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
    rules: '1'
  });

  const [errRegister, setErrRegister] = useState({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: ''
  });

  const handleChangeRegister = e => {
    const { name, value } = e.target;
    setInfoRegister({
      ...infoRegister,
      [name]: value
    });
  };

  const handleSubmitRegister = async () => {
    let isValid = true;
    const newError = {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };

    if (infoRegister.fullName.trim().length === 0) {
      isValid = false;
      newError.fullName = 'Nhập họ tên của bạn';
    } else if (infoRegister.fullName.trim().length >= 25) {
      isValid = false;
      newError.fullName = 'Nhập ít hơn 25 ký tự';
    } else {
      newError.fullName = '';
    }

    if (infoRegister.password.trim().length === 0) {
      isValid = false;
      newError.password = 'Nhập mật khẩu của bạn';
    } else {
      newError.password = '';
    }

    if (infoRegister.confirmPassword.trim().length === 0) {
      isValid = false;
      newError.confirmPassword = 'Xác nhận mật khẩu của bạn';
    } else {
      newError.confirmPassword = '';
    }

    if (infoRegister.email.trim().length === 0) {
      isValid = false;
      newError.email = 'Nhập email của bạn';
    } else if (!/.+@.+\.[A-Za-z]+$/.test(infoRegister.email)) {
      isValid = false;
      newError.email = 'Email không hợp lệ';
    } else {
      newError.email = '';
    }

    if (isValid) {
      await setLoading(true);
      await dispatch(registerAction(infoRegister));
      await setLoading(false);
    }
    setErrRegister({ ...newError });
  };
  return (
    <>
      <h3 className="title-auth">Đăng ký</h3>
      <div className="form-group">
        <Input
          className="form-control"
          titleInput="Họ và tên"
          htmlFor="fullName"
          typeInput="text"
          placeholder="Placeholder"
          name="fullName"
          onChange={handleChangeRegister}
          errorInput={errRegister.fullName}
        />
      </div>
      <div className="form-group">
        <Input
          className="form-control"
          titleInput="Email"
          htmlFor="email"
          typeInput="text"
          placeholder="abc@gmail.com"
          name="email"
          onChange={handleChangeRegister}
          errorInput={errRegister.email}
        />
      </div>
      <div className="form-group">
        <Input
          className="form-control"
          titleInput="Mật khẩu"
          htmlFor="password"
          typeInput="password"
          placeholder="Placeholder"
          name="password"
          onChange={handleChangeRegister}
          errorInput={errRegister.password}
        />
      </div>
      <div className="form-group">
        <Input
          className="form-control"
          titleInput="Xác nhận mật khẩu"
          htmlFor="confirmPassword"
          typeInput="password"
          placeholder="Placeholder"
          name="confirmPassword"
          onChange={handleChangeRegister}
          errorInput={errRegister.confirmPassword}
        />
      </div>
      <div className="form-group">
        <SelectOption
          titleInput="Vai trò"
          htmlFor="rules"
          name="rules"
          data={dataOption}
          onChange={handleChangeRegister}
        />
      </div>
      {loading && <Button content="Loading ..." className="btn-full-width" />}
      {!loading && <Button content="Đăng ký" className="btn-full-width" onclick={handleSubmitRegister} />}
      <div className="d-flex align-items-center or-auth">
        <hr /> Hoặc <hr />
      </div>
      {/* <div className="wrapper-form-action">
        <Button content="Google" className="btn-full-width btn-google" />
        <Button content="Facebook" className="btn-full-width btn-facebook" />
      </div> */}
      <div className="d-flex justify-content-space-between more-auth">
        <p>
          Bạn đã có tài khoản?{' '}
          <Link to="/dang-nhap">
            <span>Đăng nhập ngay</span>
          </Link>
        </p>
      </div>
    </>
  );
}

export default FormRegister;
