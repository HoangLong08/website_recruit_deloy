import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDropzone } from 'react-dropzone';
import { Input, Space, Button, Radio, Select, Spin } from 'antd';
import { getAllCityAction, getAllDistrictByIdCityAction } from 'store/actions/address';
import { nanoid } from 'nanoid';
import { getInfoCandidateByIdUserAction, updateInfoCandidateAction } from 'store/actions/candidate';
import candidate from 'store/api/candidate';

const { Option } = Select;

function FormInfoCandidate() {
  const dispatch = useDispatch();
  const citySlice = useSelector(state => state.addressSlice.city);
  const listDistrictByIdCity = useSelector(state => state.addressSlice.listDistrict);
  const infoCandidateSlice = useSelector(state => state.candidateSlice.infoCandidate);
  const authSlice = useSelector(state => state.authSlice);

  const [valueInfoCandidate, setValueInfoCandidate] = useState({
    userId: '',
    image: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    fullName: '',
    gender: 'Nam',
    numberPhone: '',
    city: 0,
    district: 0,
    street: ''
  });

  const onDrop = useCallback(
    async acceptedFiles => {
      setValueInfoCandidate({
        ...valueInfoCandidate,
        image: URL.createObjectURL(acceptedFiles[0])
      });
      const res = await candidate.uploadCv(acceptedFiles[0]);
      setValueInfoCandidate({
        ...valueInfoCandidate,
        image: res.data
      });
    },
    [valueInfoCandidate]
  );

  useEffect(() => {
    dispatch(getInfoCandidateByIdUserAction({ idUser: authSlice.data.info?.[0]?.user_id }));
    dispatch(getAllCityAction());
  }, [dispatch, authSlice.data.info]);

  useEffect(() => {
    const { user_id, user_address, user_gender, user_id_city, user_id_district, user_image, user_name, user_phone } =
      infoCandidateSlice.data;
    setValueInfoCandidate({
      userId: user_id,
      image: user_image,
      fullName: user_name,
      gender: user_gender,
      numberPhone: user_phone,
      city: user_id_city,
      district: user_id_district,
      street: user_address
    });
  }, [infoCandidateSlice, dispatch]);

  useEffect(() => {
    if (!infoCandidateSlice.load) {
      dispatch(getAllDistrictByIdCityAction({ idCity: valueInfoCandidate.city || 1 }));
    }
  }, [dispatch, infoCandidateSlice.load, valueInfoCandidate.city]);

  const handleChangeInfoCandidate = (e, _field) => {
    let newObj = {
      ...valueInfoCandidate
    };
    if (_field === 'city') {
      newObj = {
        ...newObj,
        city: e
      };
      dispatch(getAllDistrictByIdCityAction({ idCity: e }));
    }
    if (_field === 'fullName') {
      newObj = {
        ...newObj,
        fullName: e.target.value
      };
    }
    if (_field === 'gender') {
      newObj = {
        ...newObj,
        gender: e.target.value
      };
    }
    if (_field === 'numberPhone') {
      newObj = {
        ...newObj,
        numberPhone: e.target.value
      };
    }
    if (_field === 'city') {
      newObj = {
        ...newObj,
        city: e
      };
    }
    if (_field === 'district') {
      newObj = {
        ...newObj,
        district: e
      };
    }
    if (_field === 'street') {
      newObj = {
        ...newObj,
        street: e.target.value
      };
    }

    setValueInfoCandidate(newObj);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  const handleUpdateInfoCandidate = () => {
    const { userId, image, fullName, gender, numberPhone, city, district, street } = valueInfoCandidate;
    dispatch(
      updateInfoCandidateAction({
        userId: userId,
        userName: fullName,
        userGender: gender,
        userPhone: numberPhone,
        userIdCity: city,
        userIdDistrict: district,
        userIdStreet: 2644,
        userAddress: street,
        userImage: image
      })
    );
  };

  return (
    <>
      {infoCandidateSlice.load && (
        <div className="wrapper-loading-content">
          <Spin size="large" />
        </div>
      )}
      {!infoCandidateSlice.load && (
        <>
          <div className="wrapper-form">
            <div className="form-group form-group-width">
              <p>Hình ảnh</p>
              <div className="wrapper-upload-avatar">
                <img src={valueInfoCandidate.image} alt="hinh anh" />
                <div
                  {...getRootProps({
                    className: `content-upload-avatar`
                  })}
                >
                  <input {...getInputProps()} />
                  <p className="text-upload-image">Tải ảnh lên</p>
                </div>
              </div>
            </div>
            <div className="form-group form-group-width">
              <p>Họ và tên</p>
              <Input
                size="large"
                placeholder="Họ và tên"
                allowClear
                onChange={e => handleChangeInfoCandidate(e, 'fullName')}
                value={valueInfoCandidate.fullName || ''}
              />
            </div>
            <div className="form-group form-group-width">
              <p>Giới tính</p>
              <Radio.Group onChange={e => handleChangeInfoCandidate(e, 'gender')} value={valueInfoCandidate.gender}>
                <Radio value="Nam">Nam</Radio>
                <Radio value="Nữ">Nữ</Radio>
                <Radio value="Khác">Khác</Radio>
              </Radio.Group>
            </div>
            <div className="form-group form-group-width">
              <p>Số điện thoại</p>
              <Input
                size="large"
                placeholder="Số điện thoại"
                allowClear
                onChange={e => handleChangeInfoCandidate(e, 'numberPhone')}
                value={valueInfoCandidate.numberPhone || ''}
              />
            </div>
            <div className="form-group form-group-width">
              <p>Tỉnh / Thành phố</p>
              <Select
                size="large"
                defaultValue={valueInfoCandidate.city || 0}
                value={valueInfoCandidate.city}
                style={{ width: '100%' }}
                onChange={e => handleChangeInfoCandidate(e, 'city')}
              >
                <Option value={0}>Chọn</Option>
                {citySlice.data?.data?.map(item => (
                  <Option value={item.id} key={nanoid()}>
                    {item.city}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="form-group form-group-width">
            <p>Xã / Quận</p>
            <Select
              size="large"
              defaultValue={valueInfoCandidate.district || 0}
              value={valueInfoCandidate.district}
              style={{ width: '100%' }}
              disabled={valueInfoCandidate.city === 0}
              onChange={e => handleChangeInfoCandidate(e, 'district')}
            >
              <Option value={0}>Chọn</Option>
              {listDistrictByIdCity.data?.data?.map(item => (
                <Option value={item.id} key={nanoid()}>
                  {item.district}
                </Option>
              ))}
            </Select>
          </div>
          <div className="form-group form-group-width">
            <p>Đường / thôn</p>
            <Input
              size="large"
              placeholder="Tên đuờng hoặc tên thôn"
              allowClear
              onChange={e => handleChangeInfoCandidate(e, 'street')}
              value={valueInfoCandidate.street || ''}
            />
          </div>
          <Space size={[8, 16]} className="form-group-width">
            <Button type="primary" size="large" onClick={handleUpdateInfoCandidate}>
              Cập nhật thông tin
            </Button>
          </Space>
        </>
      )}
    </>
  );
}

export default FormInfoCandidate;
