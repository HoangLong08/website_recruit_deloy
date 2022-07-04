import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPasswordAction, submitOtpAction } from 'store/actions/auth';
import { isEmpty } from 'lodash';
import { createAlert } from 'store/reducers/notificationSlice';
import './style.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [valueForm, setValueForm] = useState('');
  const [valueOtp, setValueOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isOtp, setIsOtp] = useState(false);
  const handleSubmit = async () => {
    await setLoading(true);
    const res = await dispatch(
      forgotPasswordAction({
        email: valueForm
      })
    );
    if (!isEmpty(res.payload)) {
      await setIsForgotPassword(true);
      await dispatch(
        createAlert({
          message: 'Kiểm tra email của bạn',
          type: 'success'
        })
      );
    } else {
      await setIsForgotPassword(false);
    }
    await setValueForm('');
    await setLoading(false);
  };

  const handleSubmitOtp = async () => {
    await setLoading(true);
    const res = await dispatch(
      submitOtpAction({
        otp: valueOtp
      })
    );
    if (!isEmpty(res.payload)) {
      await setIsOtp(true);
      await dispatch(
        createAlert({
          message: 'Gửi mã otp thành công',
          type: 'success'
        })
      );
    } else {
      await setIsOtp(false);
    }
    await setValueOtp('');
    await setLoading(false);
  };

  return (
    <>
      <div className="form-forgot">
        <div className="box-white content-forgot">
          <div>
            {!isForgotPassword && !isOtp && (
              <>
                <div className="form-group">
                  <Input
                    size="large"
                    placeholder="abc@gmail.com"
                    allowClear
                    value={valueForm || ''}
                    onChange={e => setValueForm(e.target.value)}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-space-between">
                  <Button
                    onClick={() => {
                      navigate(-1);
                    }}
                  >
                    Quay lại
                  </Button>
                  <Button type="primary" loading={loading} onClick={handleSubmit} disabled={valueForm.length === 0}>
                    Gửi
                  </Button>
                </div>
              </>
            )}
            {isForgotPassword && !isOtp && (
              <>
                <div className="form-group">
                  <Input
                    size="large"
                    placeholder="Mã OTP"
                    allowClear
                    value={valueOtp || ''}
                    onChange={e => setValueOtp(e.target.value)}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-space-between">
                  <Button
                    onClick={() => {
                      setIsForgotPassword(false);
                    }}
                  >
                    Quay lại
                  </Button>
                  <Button type="primary" loading={loading} onClick={handleSubmitOtp} disabled={valueOtp.length === 0}>
                    Gửi
                  </Button>
                </div>
              </>
            )}
            {isOtp && (
              <>
                <div className="form-group">
                  <Input
                    size="large"
                    placeholder="abc@gmail.com"
                    allowClear
                    value={valueOtp || ''}
                    onChange={e => setValueOtp(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <Input
                    size="large"
                    placeholder="Mật khẩu mới "
                    allowClear
                    value={valueOtp || ''}
                    onChange={e => setValueOtp(e.target.value)}
                  />
                </div>
                <div className="d-flex align-items-center justify-content-space-between">
                  <Button
                    onClick={() => {
                      setIsForgotPassword(false);
                      setIsOtp(false);
                    }}
                  >
                    Quay lại
                  </Button>
                  <Button type="primary" loading={loading} onClick={handleSubmitOtp} disabled={valueForm.length === 0}>
                    Gửi
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
