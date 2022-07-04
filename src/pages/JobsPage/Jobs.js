/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useNavigate, createSearchParams, useLocation } from 'react-router-dom';
import { Row, Col, Select, Checkbox, Radio, Space, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import HeaderClient from 'layouts/Header/HeaderClient';
import Footer from 'layouts/Footer/index';
import ItemJob from '../../layouts/ItemJob/ItemJob';
import Pagination from 'components/Pagination';
import ItemJobLoading from '../../layouts/ItemJob/ItemJobLoading';
import { IconFilter, IconDown, NoResults, IconSearch, Banner } from 'assets/index';
import { getJobAction } from 'store/actions/job';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { getSpecializeAction } from 'store/actions/specialized';
import './style.css';
import { getAllCityAction } from 'store/actions/address';

const { Option } = Select;

const getQueryParams = query =>
  window.location.search
    .replace('?', '')
    .split('&')
    .map(e => e.split('=').map(decodeURIComponent))
    // eslint-disable-next-line no-sequences
    .reduce((r, [k, v]) => ((r[k] = v), r), {});

function Jobs() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const jobSlice = useSelector(state => state.jobSlice.jobs);
  const citySlice = useSelector(state => state.addressSlice.city);
  const infoUser = useSelector(state => state.authSlice);
  const specializes = useSelector(state => state.specializedSlice.specializes);
  const [paramUrl, setParamUrl] = useState({});
  console.log('jobSlice: ', jobSlice);
  useEffect(() => {
    if (!isEmpty(location.search)) {
      // param no empty
      const paramFromUrl = getQueryParams(location.search);
      dispatch(
        getJobAction({
          searchKey: paramFromUrl.searchKey || '',
          pageIndex: paramFromUrl.page || 1,
          pageSize: 10,
          specializes: paramFromUrl.specializes,
          salaryTo: paramFromUrl.salaryTo || null,
          salaryFrom: paramFromUrl.salaryFrom,
          userId: infoUser.data?.info?.[0]?.user_id || 0,
          idCity: paramFromUrl.address || null
        })
      );
      setParamUrl(paramFromUrl);
    } else {
      dispatch(
        getJobAction({
          searchKey: '',
          pageIndex: 1,
          pageSize: 10,
          specializes: null,
          salaryTo: null,
          salaryFrom: null,
          userId: infoUser.data?.info?.[0]?.user_id || 0,
          idCity: null
        })
      );
    }
  }, [location, infoUser.data, dispatch]);

  useEffect(() => {
    dispatch(getAllCityAction());
    dispatch(
      getSpecializeAction({
        nameSpecialized: ''
      })
    );
  }, [dispatch]);

  // console.log('specializes: ', specializes);

  const onChangeParamUrl = (e, _field) => {
    let newParam = paramUrl;
    if (_field === 'searchKey') {
      newParam = {
        ...newParam,
        searchKey: e.target.value
      };
    } else if (_field === 'specializes') {
      newParam = {
        ...newParam,
        specializes: e
      };
    } else if (_field === 'salary') {
      const salary = e.target.value.split('-');
      newParam = {
        ...newParam,
        salaryTo: salary[1],
        salaryFrom: salary[0]
      };
    } else if (_field === 'special') {
      newParam = {
        ...newParam,
        special: e
      };
    } else if (_field === 'address') {
      newParam = {
        ...newParam,
        address: e
      };
    } else if (_field === 'page') {
      newParam = {
        ...newParam,
        page: e
      };
    }
    navigate({
      pathname: '/viec-lam',
      search: `?${createSearchParams(newParam)}`
    });
    setParamUrl(newParam);
  };

  const convertTime = _time => {
    if (_time) {
      const date = new Date(_time);
      const timeZone = 'Asia/Saigon';
      const zonedDate = utcToZonedTime(date, timeZone);
      const pattern = 'dd-MM-yyyy';
      const output = format(zonedDate, pattern, { timeZone: timeZone });
      return output;
    }
    return null;
  };

  return (
    <>
      <HeaderClient />
      <div className="wrapper-jobs">
        <div className="container">
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={6} md={6} lg={6}>
              <div className="wrapper-filter-container">
                <div className="filter-container filter-box filter-header">
                  <IconFilter />
                  <span>Bộ lọc</span>
                </div>
                <div className=" filter-box filter-header">
                  <p>Chuyên ngành</p>
                  <div>
                    <Select
                      style={{ width: '100%' }}
                      onChange={e => {
                        onChangeParamUrl(e, 'specializes');
                      }}
                    >
                      {specializes.data?.data?.map(item => (
                        <Option key={item.specialized_id}>{item.specialized_name}</Option>
                      ))}
                    </Select>
                  </div>
                </div>
                <div className=" filter-box filter-header">
                  <div className="d-flex justify-content-space-between title-filter-box">
                    <p>Lương</p>
                    <IconDown />
                  </div>
                  <div>
                    <Radio.Group
                      onChange={e => {
                        onChangeParamUrl(e, 'salary');
                      }}
                    >
                      <Space direction="vertical">
                        <Radio value="0-5000000">0 - 5.000.000</Radio>
                        <Radio value="5000000-10000000">5.000.000 - 10.000.000</Radio>
                        <Radio value="10000000-20000000">10.000.000 - 20.000.000</Radio>
                        <Radio value="20000000-40000000">20.000.000 - 40.000.000</Radio>
                        <Radio value="50000000-9990000000">Trên 50.000.000</Radio>
                      </Space>
                    </Radio.Group>
                  </div>
                </div>

                <div className="filter-container filter-box filter-header d-flex justify-content-space-between">
                  <p>Địa điểm</p>
                  <Select
                    defaultValue={'allCity'}
                    style={{ width: 180 }}
                    onChange={e => {
                      onChangeParamUrl(e, 'address');
                    }}
                  >
                    <Option value="allCity">Tất cả thành phố</Option>
                    {citySlice.data?.data?.map(item => (
                      <Option value={item.id} key={item.id}>
                        {item.city}
                      </Option>
                    ))}
                  </Select>
                </div>
                {/* <div className=" filter-box filter-header">
                  <div className="d-flex justify-content-space-between title-filter-box">
                    <p>Lĩnh vực</p>
                    <IconDown />
                  </div>
                  <div className="filter-body">
                    <Checkbox.Group
                      options={options}
                      defaultValue={[]}
                      onChange={e => {
                        onChangeParamUrl(e, 'special');
                      }}
                    />
                  </div>
                </div> */}
              </div>
            </Col>
            <Col xs={24} sm={12} md={12} lg={12}>
              <div className="form-group">
                <Input
                  size="large"
                  placeholder="Tìm kiếm công, việc ..."
                  allowClear
                  prefix={<IconSearch />}
                  // value={valueForm || ''}
                  onChange={e => {
                    onChangeParamUrl(e, 'searchKey');
                  }}
                />
              </div>
              {!jobSlice.load && jobSlice.data?.data?.length === 0 && (
                <div className="wrapper-jobs-no-result">
                  <img src={NoResults} alt="no result" />
                  <p>Không thể tìm thấy công việc phù hợp với tiêu chí tìm kiếm của bạn.</p>
                </div>
              )}
              <>
                <div className="wrapper-list-jobs-search">
                  {jobSlice?.load && (
                    <>
                      <ItemJobLoading />
                      <ItemJobLoading />
                      <ItemJobLoading />
                      <ItemJobLoading />
                      <ItemJobLoading />
                    </>
                  )}
                  {!jobSlice?.load &&
                    jobSlice.data?.data?.map(item => (
                      <ItemJob
                        key={item.jd_id}
                        id={item.jd_id}
                        companyName={item.company_name}
                        address={item.jd_address}
                        nameJob={item.jd_title}
                        logoCompany={item.company_logo}
                        salaryFrom={item.jd_salary_from}
                        salaryTo={item.jd_salary_to}
                        isFavorites={item.isFavorites}
                        time={convertTime(item.jd_updated)}
                      />
                    ))}
                </div>
              </>
              {jobSlice.data?.total > 10 && (
                <div className="wrapper-jobs-pagination">
                  <Pagination
                    totalPage={jobSlice.data.total}
                    pageCurrent={parseInt(paramUrl.page) || 1}
                    onChange={e => onChangeParamUrl(e, 'page')}
                  />
                </div>
              )}
            </Col>
            <Col xs={24} sm={6} md={6} lg={6}>
              <div className="wrapper-banner-container">
                <img src={Banner} alt="" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Jobs;
