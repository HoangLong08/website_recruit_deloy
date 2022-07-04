import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Footer from 'layouts/Footer/index';
import HeaderClient from 'layouts/Header/HeaderClient';
import { Button, Tabs, Row, Col } from 'antd';
import { getDetailCompanyAction } from 'store/actions/company';
import { getListJobByIdCompanyAction } from 'store/actions/job';
import ItemJob from 'layouts/ItemJob/ItemJob';
import { NoResults } from 'assets/index';
import './style.css';

const { TabPane } = Tabs;

function DetailCompany() {
  const { idCompany } = useParams();
  const dispatch = useDispatch();
  const detailCompanySlice = useSelector(state => state.companySlice.detailCompany);
  const listJobOfCompanySlice = useSelector(state => state.jobSlice.listJobOfCompany);
  const [detailCompanyState, setDetailCompanyState] = useState({
    companyName: '',
    companyLogo: '',
    companyWebsite: '',
    companyAddress: '',
    companyMember: '',
    companyService: '',
    companyDes: '',
    companyEstablish: ''
  });

  useEffect(() => {
    dispatch(
      getDetailCompanyAction({
        idCompany: idCompany
      })
    );
    dispatch(
      getListJobByIdCompanyAction({
        idCompany: idCompany
      })
    );
  }, [idCompany, dispatch]);

  useEffect(() => {
    const {
      company_name,
      company_logo,
      company_website,
      company_address,
      company_member,
      company_service,
      company_des,
      company_establish
    } = detailCompanySlice.data;
    setDetailCompanyState({
      companyName: company_name,
      companyLogo: company_logo,
      companyWebsite: company_website,
      companyAddress: company_address,
      companyMember: company_member,
      companyService: company_service,
      companyDes: company_des,
      companyEstablish: company_establish
    });
  }, [detailCompanySlice]);

  const createMarkup = _des => {
    return { __html: _des };
  };

  return (
    <>
      <HeaderClient />
      <div className="wrapper-detail-company">
        <div className="container">
          <div className="cover-wrapper">
            <img src={detailCompanyState.companyLogo} alt="aa" className="img-responsive cover-img" />
          </div>
          <div className="company-detail-overview ">
            <div className="company-image-logo">
              <img src={detailCompanyState.companyLogo} alt="" />
            </div>
            <div className="company-info">
              <h1>{detailCompanyState.companyName}</h1>
              <div className="wrapper-form-action ">
                <a href={detailCompanyState.companyWebsite} target="_blank" rel="noreferrer">
                  {detailCompanyState.companyWebsite}
                </a>
                <p>{detailCompanyState.companyMember + ' Thành viên'}</p>
              </div>
            </div>
            <div className="box-follow">
              <span className="text-follow">10K theo dõi</span>
              <Button type="primary" style={{ width: '180px' }}>
                Theo dõi công ty
              </Button>
            </div>
          </div>

          <div className="wrapper-detail-company-main">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={16} md={16} lg={16}>
                <div className="detail-job-big-des  box-white">
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Giới thiệu" key="1">
                      <div dangerouslySetInnerHTML={createMarkup(detailCompanyState.companyDes)} />
                    </TabPane>
                    <TabPane tab="Tin tuyển dụng" key="2">
                      {!listJobOfCompanySlice.load && listJobOfCompanySlice.data?.length === 0 && (
                        <div className="wrapper-jobs-no-result">
                          <img src={NoResults} alt="no result" />
                          <p>Chưa có công việc nào</p>
                        </div>
                      )}
                      {listJobOfCompanySlice.data.map(item => (
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
                        />
                      ))}
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
              <Col xs={24} sm={8} md={8} lg={8}>
                <div className="detail-company-address box-white">
                  <p>Địa chỉ</p>
                  <p>{detailCompanyState.companyAddress}</p>
                </div>
                <div className="detail-company-address box-white">
                  <p>Hình ảnh về công ty</p>
                  <p>{detailCompanyState.companyAddress}</p>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DetailCompany;
