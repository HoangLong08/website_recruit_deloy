import React, { useEffect } from 'react';
import Footer from 'layouts/Footer/index';
import HeaderClient from 'layouts/Header/HeaderClient';
import { Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getCompanyAction } from 'store/actions/company';
import { IconSearch } from 'assets/index';
import { debounce } from 'lodash';
import ItemCompany from './ItemCompany';
import { nanoid } from 'nanoid';
import ItemCompanyLoading from './ItemCompanyLoading';
import './style.css';

function Company() {
  const dispatch = useDispatch();
  const companySlice = useSelector(state => state.companySlice.listCompany);
  useEffect(() => {
    dispatch(
      getCompanyAction({
        pageSize: 999,
        pageIndex: 1,
        companyCode: '',
        companyName: '',
        companyAddress: '',
        companyService: ''
      })
    );
  }, [dispatch]);

  const debounceText = debounce(value => {
    dispatch(
      getCompanyAction({
        pageSize: 999,
        pageIndex: 1,
        companyCode: '',
        companyName: value,
        companyAddress: '',
        companyService: ''
      })
    );
  }, 1000);

  const handleChangeSearch = e => {
    debounceText(e.target.value.trim());
  };

  return (
    <>
      <HeaderClient />
      <div className="wrapper-company">
        <div className="container">
          <div className="content-company-top d-flex align-items-center justify-content-space-between ">
            <h1>Danh sách công ty hàng đầu</h1>
            <div>
              <Input prefix={<IconSearch />} placeholder="Tìm kiếm" onChange={handleChangeSearch} />
            </div>
          </div>
          <div className="wrapper-list-company">
            {companySlice.load && (
              <>
                <ItemCompanyLoading />
                <ItemCompanyLoading />
                <ItemCompanyLoading />
                <ItemCompanyLoading />
                <ItemCompanyLoading />
                <ItemCompanyLoading />
                <ItemCompanyLoading />
                <ItemCompanyLoading />
              </>
            )}
            {!companySlice.load && companySlice.data?.data?.length === 0 && (
              <div className="wrapper-list-company-empty">Data empty</div>
            )}
            {!companySlice.load &&
              companySlice.data?.data?.map(item => {
                return (
                  <ItemCompany
                    key={nanoid()}
                    idCompany={item.company_id}
                    nameCompany={item.company_name}
                    logoCompany={item.company_logo}
                    establish={item.company_establish}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Company;
