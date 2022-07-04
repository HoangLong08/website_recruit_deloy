import React, { useState, useEffect } from 'react';
import { Input, Select, Space, Button, DatePicker, Spin } from 'antd';
import CKeditor from 'components/CKEditor/index';
import { nanoid } from 'nanoid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCityAction, getAllDistrictByIdCityAction } from 'store/actions/address';
import { createJobAction, getDetailJobByIdAction, updateJobByIdJdAction } from 'store/actions/job';
import { getCompanyByIdUserAction } from 'store/actions/company';
import { getSpecializeAction } from 'store/actions/specialized';
import { format, endOfDay } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

function FormPost({ type, idPost }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const citySlice = useSelector(state => state.addressSlice.city);
  const authSlice = useSelector(state => state.authSlice);
  const listDistrictByIdCity = useSelector(state => state.addressSlice.listDistrict);
  // const companySlice = useSelector(state => state.companySlice.listCompanyByIdUser);
  const specializes = useSelector(state => state.specializedSlice.specializes);
  const jobDetailSlice = useSelector(state => state.jobSlice.detailJob);
  const [loading, setLoading] = useState(false);
  const [valueForm, setValueForm] = useState({
    title: '',
    salaryFrom: '',
    salaryTo: '',
    city: 0,
    district: 0,
    address: '',
    companyId: '',
    specializedId: '',
    dateExpire: ''
  });

  const [editorState, setEditorState] = useState('');

  function disabledDate(current) {
    return current && current < endOfDay(new Date());
  }

  const convertTime = _time => {
    if (_time) {
      const date = new Date(_time);
      const timeZone = 'Asia/Saigon';
      const zonedDate = utcToZonedTime(date, timeZone);
      const pattern = 'yyyy-MM-dd HH:mm:ss';
      const output = format(zonedDate, pattern, { timeZone: timeZone });
      return output;
    }
    return null;
  };

  useEffect(() => {
    dispatch(getAllCityAction());
    dispatch(
      getCompanyByIdUserAction({
        idUser: authSlice.data?.info?.[0]?.user_id
      })
    );
    dispatch(
      getSpecializeAction({
        nameSpecialized: ''
      })
    );
  }, [dispatch, authSlice]);

  useEffect(() => {
    if (type) {
      dispatch(
        getDetailJobByIdAction({
          idJob: idPost,
          idUser: authSlice.data?.info?.[0]?.user_id
        })
      );
    }
  }, [dispatch, idPost, type, authSlice.data]);

  useEffect(() => {
    if (type) {
      const {
        city_id,
        company_id,
        date_expire,
        district_id,
        jd_address,
        jd_des,
        jd_salary_from,
        jd_salary_to,
        jd_title,
        specialized_id
      } = jobDetailSlice.data;
      setValueForm({
        title: jd_title,
        salaryFrom: jd_salary_from,
        salaryTo: jd_salary_to,
        city: city_id,
        district: district_id,
        address: jd_address,
        companyId: company_id,
        specializedId: specialized_id,
        dateExpire: date_expire && convertTime(date_expire)
      });
      setEditorState(jd_des);
      dispatch(getAllDistrictByIdCityAction({ idCity: city_id }));
    }
  }, [dispatch, idPost, type, jobDetailSlice]);

  const redirectUrl = _url => () => {
    navigate(_url);
  };

  const handleChangeForm = (e, _field) => {
    let newObj = {
      ...valueForm
    };
    if (_field === 'city') {
      newObj = {
        ...newObj,
        city: e
      };
      dispatch(getAllDistrictByIdCityAction({ idCity: e }));
    }
    if (_field === 'district') {
      newObj = {
        ...newObj,
        district: e
      };
    }
    if (_field === 'address') {
      newObj = {
        ...newObj,
        address: e.target.value
      };
    }
    if (_field === 'title') {
      newObj = {
        ...newObj,
        title: e.target.value
      };
    }
    if (_field === 'salaryFrom') {
      newObj = {
        ...newObj,
        salaryFrom: e.target.value
      };
    }
    if (_field === 'salaryTo') {
      newObj = {
        ...newObj,
        salaryTo: e.target.value
      };
    }
    // if (_field === 'companyId') {
    //   newObj = {
    //     ...newObj,
    //     companyId: e
    //   };
    // }
    if (_field === 'dateExpire') {
      newObj = {
        ...newObj,
        dateExpire: e
      };
    }
    if (_field === 'specializedId') {
      newObj = {
        ...newObj,
        specializedId: e
      };
    }
    setValueForm(newObj);
  };

  const handleSubmit = async () => {
    await setLoading(true);
    if (type) {
      await dispatch(
        updateJobByIdJdAction({
          ...valueForm,
          idJob: idPost,
          des: editorState,
          userId: authSlice.data?.info?.[0]?.user_id
        })
      );
    } else {
      await dispatch(
        createJobAction({
          ...valueForm,
          des: editorState,
          userId: authSlice.data?.info?.[0]?.user_id
        })
      );
    }
    await setLoading(false);
    await navigate(-1);
  };

  return (
    <>
      {type === 'edit' && jobDetailSlice.load && (
        <div className="wrapper-loading-content">
          <Spin size="large" />
        </div>
      )}
      {!jobDetailSlice.load && (
        <div>
          <div className="form-group form-group-width">
            <p>Chức danh</p>
            <Input
              size="large"
              placeholder="Chức danh"
              allowClear
              value={valueForm.title || ''}
              onChange={e => handleChangeForm(e, 'title')}
            />
          </div>
          <div className="form-group">
            <p>Mô tả công việc</p>
            <CKeditor valueEditor={editorState} onChangeEditor={e => setEditorState(e)} />
          </div>
          <div className="form-group form-group-width">
            <p>Tiền lương</p>
            <div className="wrapper-form-action">
              <Input
                size="large"
                placeholder="Từ"
                allowClear
                value={valueForm.salaryFrom || ''}
                onChange={e => handleChangeForm(e, 'salaryFrom')}
              />
              <Input
                size="large"
                placeholder="Đến"
                allowClear
                value={valueForm.salaryTo || ''}
                onChange={e => handleChangeForm(e, 'salaryTo')}
              />
            </div>
          </div>
          <div className="form-group form-group-width">
            <p>Chọn chuyên ngành</p>
            <Select
              size="large"
              style={{ width: '100%' }}
              value={valueForm.specializedId || ''}
              onChange={e => handleChangeForm(e, 'specializedId')}
            >
              <Option value={0}>Chọn</Option>
              {specializes?.data?.data?.map(item => (
                <Option value={item.specialized_id} key={nanoid()}>
                  {item.specialized_name}
                </Option>
              ))}
            </Select>
          </div>
          <div className="form-group form-group-width">
            <p>Ngày hết hạn</p>
            <DatePicker
              size="large"
              // disabledDate={disabledDate}
              onChange={(date, dateString) => handleChangeForm(dateString, 'dateExpire')}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </div>
          {/* <div className="form-group form-group-width">
            <p>Chọn công ty</p>
            <Select
              size="large"
              style={{ width: '100%' }}
              value={valueForm.companyId || ''}
              onChange={e => handleChangeForm(e, 'companyId')}
            >
              <Option value={0}>Chọn</Option>
              {companySlice?.data?.data?.map(item => (
                <Option value={item.company_id} key={nanoid()}>
                  {item.company_name}
                </Option>
              ))}
            </Select>
          </div> */}
          <div className="form-group form-group-width">
            <p>Tỉnh / Thành phố</p>
            <Select
              size="large"
              style={{ width: '100%' }}
              value={valueForm.city || ''}
              onChange={e => handleChangeForm(e, 'city')}
            >
              <Option value={0}>Chọn</Option>
              {citySlice.data?.data?.map(item => (
                <Option value={item.id} key={nanoid()}>
                  {item.city}
                </Option>
              ))}
            </Select>
          </div>
          <div className="form-group form-group-width">
            <p>Xã / Quận</p>
            <Select
              size="large"
              style={{ width: '100%' }}
              value={valueForm.district || ''}
              onChange={e => handleChangeForm(e, 'district')}
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
              value={valueForm.address || ''}
              onChange={e => handleChangeForm(e, 'address')}
            />
          </div>
          <Space size={[8, 16]} className="form-group-width">
            <Button danger size="large" onClick={redirectUrl(-1)}>
              Hủy
            </Button>
            <Button type="primary" size="large" onClick={handleSubmit} loading={loading}>
              {type ? 'Cập nhật bài đăng' : 'Tạo bài đăng'}
            </Button>
          </Space>
        </div>
      )}
    </>
  );
}

export default FormPost;
