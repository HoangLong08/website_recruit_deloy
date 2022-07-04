/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Input, Tabs, Row, Col, Space, Button, Radio, Select } from 'antd';
import FormInfoCandidate from './FormInfoCandidate';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordAction } from 'store/actions/candidate';
import RecordInfoCandidate from './RecordInfoCandidate';

const { TabPane } = Tabs;

function InfoCandidate() {
  const dispatch = useDispatch();
  const authSlice = useSelector(state => state.authSlice);

  const [valueFormPass, setValueFormPass] = useState({
    passwordOld: '',
    passwordNew: '',
    passwordConfirm: ''
  });

  const [errorFormPass, setErrorFormPass] = useState({
    passwordOld: '',
    passwordNew: '',
    passwordConfirm: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setValueFormPass({
      ...valueFormPass,
      [name]: value
    });
  };

  const handleUpdatePass = () => {
    let isValid = true;
    const newError = {
      passwordOld: '',
      passwordNew: '',
      passwordConfirm: ''
    };
    if (valueFormPass.passwordOld.trim().length === 0) {
      isValid = false;
      newError.passwordOld = 'Nhập mật khẩu cũ';
    } else {
      newError.passwordOld = '';
    }
    if (valueFormPass.passwordNew.trim().length === 0) {
      isValid = false;
      newError.passwordNew = 'Nhập mật khẩu mới';
    } else {
      newError.passwordNew = '';
    }
    if (valueFormPass.passwordConfirm.trim().length === 0) {
      isValid = false;
      newError.passwordConfirm = 'Nhập lại mật khẩu mới';
    } else {
      newError.passwordConfirm = '';
    }
    if (valueFormPass.passwordNew.trim() !== valueFormPass.passwordConfirm.trim()) {
      isValid = false;
      newError.passwordConfirm = 'Mật khẩu không khớp';
    } else {
      newError.passwordConfirm = '';
    }

    if (isValid) {
      dispatch(
        updatePasswordAction({
          userId: authSlice.data?.info[0]?.user_id,
          passwordOld: valueFormPass.passwordOld,
          passwordNew: valueFormPass.passwordNew
        })
      );
    }
    setErrorFormPass({ ...newError });
  };

  return (
    <div className="wrapper-content-inner-client customize-scroll">
      <div className="content-inner-client-head">
        <p className="content-inner-client-head-title">Thông tin cá nhân</p>
      </div>
      <div className="content-inner-client-bottom">
        <Tabs defaultActiveKey="2">
          <TabPane tab="Thông tin cá nhân" key="2">
            <FormInfoCandidate />
          </TabPane>
          <TabPane tab="Hồ sơ cá nhân" key="4">
            <RecordInfoCandidate />
          </TabPane>
          <TabPane tab="Chỉnh sửa mật khẩu" key="3">
            <div className="wrapper-form">
              <div className="form-group form-group-width">
                <p>Mật khẩu cũ</p>
                <Input
                  name="passwordOld"
                  value={valueFormPass.passwordOld}
                  size="large"
                  placeholder="Mật khẩu cũ"
                  allowClear
                  onChange={handleChange}
                />
                {errorFormPass.passwordOld?.length > 0 && (
                  <small className="form-error">{errorFormPass.passwordOld}</small>
                )}
              </div>
              <div className="form-group form-group-width">
                <p>Mật khẩu mới</p>
                <Input
                  name="passwordNew"
                  value={valueFormPass.passwordNew}
                  size="large"
                  placeholder="Mật khẩu mới"
                  allowClear
                  onChange={handleChange}
                />
                {errorFormPass.passwordNew?.length > 0 && (
                  <small className="form-error">{errorFormPass.passwordNew}</small>
                )}
              </div>
              <div className="form-group form-group-width">
                <p>Xác nhận mật khẩu</p>
                <Input
                  name="passwordConfirm"
                  value={valueFormPass.passwordConfirm}
                  size="large"
                  placeholder="Xác nhận mật khẩu"
                  allowClear
                  onChange={handleChange}
                />
                {errorFormPass.passwordConfirm?.length > 0 && (
                  <small className="form-error">{errorFormPass.passwordConfirm}</small>
                )}
              </div>
            </div>
            <Space size={[8, 16]} className="form-group-width">
              <Button type="primary" size="large" onClick={handleUpdatePass}>
                Cập nhật mật khẩu
              </Button>
            </Space>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default InfoCandidate;
