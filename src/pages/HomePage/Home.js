import React, { useEffect, useState } from 'react';
import { Link, useNavigate, createSearchParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Row, Col, Select } from 'antd';
import Slider from 'react-slick';
import HeaderClient from 'layouts/Header/HeaderClient';
import Footer from 'layouts/Footer';
import Button from 'components/Button/index';
import { IconSearch, BannerHome, IconDoubleArrowRight, IconArrowLeft, IconArrowRight } from 'assets';
import ItemJob from './ItemJob';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useDispatch, useSelector } from 'react-redux';
import { getJobAction } from 'store/actions/job';
import { getCompanyAction } from 'store/actions/company';
import ItemJobLoading from './ItemJobLoading';
import { getAllCityAction } from 'store/actions/address';
import removeVietnameseTones from 'utils/removeVietnameseTones';
import './style.css';

const { Option } = Select;

const SlickButtonFix = ({ currentSlide, slideCount, children, ...props }) => <span {...props}>{children}</span>;

const settingsJob = {
  infinite: true,
  speed: 500,
  rows: 1,
  slidesToShow: 3,
  slidesPerRow: 3,
  slidesToScroll: 6,
  nextArrow: (
    <SlickButtonFix>
      <IconArrowRight />
    </SlickButtonFix>
  ),
  prevArrow: (
    <SlickButtonFix>
      <IconArrowLeft />
    </SlickButtonFix>
  )
};

const settingCompany = {
  infinite: true,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  nextArrow: (
    <SlickButtonFix>
      <IconArrowRight />
    </SlickButtonFix>
  ),
  prevArrow: (
    <SlickButtonFix>
      <IconArrowLeft />
    </SlickButtonFix>
  )
};

const dataCompany = [
  {
    id: 1,
    link: 'https://www.topcv.vn/v4/image/welcome/companies/onemoutn.png'
  },
  {
    id: 2,
    link: 'https://www.topcv.vn/v4/image/welcome/companies/prudential.png'
  },
  {
    id: 3,
    link: 'https://www.topcv.vn/v4/image/welcome/companies/fpt.png'
  },
  {
    id: 1,
    link: 'https://www.topcv.vn/v4/image/welcome/companies/tiki.png'
  },
  {
    id: 2,
    link: 'https://www.topcv.vn/v4/image/welcome/companies/viettel.png'
  },
  {
    id: 3,
    link: 'https://www.topcv.vn/v4/image/welcome/companies/teachcombank.png'
  },
  {
    id: 1,
    link: 'https://www.topcv.vn/v4/image/welcome/companies/onemoutn.png'
  }
];

const dataIndustry = [
  {
    id: 1,
    des: 'T???t c???'
  },
  {
    id: 2,
    des: 'C??ng ngh??? th??ng tin'
  },
  {
    id: 3,
    des: 'Thi???t k???'
  },
  {
    id: 4,
    des: 'X??y d???ng'
  },
  {
    id: 5,
    des: 'Du l???ch'
  },
  {
    id: 5,
    des: 'Qu???n tr??? kinh doanh'
  },
  {
    id: 6,
    des: 'Qu???n tr??? kinh doanh'
  }
];

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobSlice = useSelector(state => state.jobSlice.jobs);
  const citySlice = useSelector(state => state.addressSlice.city);
  const infoUser = useSelector(state => state.authSlice);
  const companySlice = useSelector(state => state.companySlice.listCompany);
  const [checkShowMore, setCheckShowMore] = useState(false);
  const [errorSearch, setErrorSearch] = useState('');
  const [paramUrl, setParamUrl] = useState({
    address: 1
  });

  useEffect(() => {
    dispatch(
      getJobAction({
        searchKey: '',
        pageIndex: 1,
        pageSize: 12,
        salaryTo: null,
        salaryFrom: null,
        userId: infoUser.data?.info?.[0]?.user_id || 0,
        idCity: null
      })
    );
    dispatch(
      getCompanyAction({
        pageSize: 6,
        pageIndex: 1,
        companyCode: '',
        companyName: '',
        companyAddress: '',
        companyService: ''
      })
    );
    dispatch(getAllCityAction());
  }, [dispatch, infoUser.data?.info]);

  const handleChangeUrl = _url => () => {
    navigate(_url);
  };

  const onChangeParamUrl = (e, _field) => {
    let newParam = { ...paramUrl };
    if (_field === 'address') {
      newParam = {
        ...newParam,
        address: e
      };
    } else if (_field === 'search') {
      newParam = {
        ...newParam,
        search: e.target.value
      };
    }
    setParamUrl(newParam);
  };

  const handleSearchJob = () => {
    if (paramUrl?.search) {
      navigate({
        pathname: '/viec-lam',
        search: `?${createSearchParams({
          search: removeVietnameseTones(paramUrl.search?.trim(), '-'),
          address: paramUrl.address
        })}`
      });
    } else {
      setErrorSearch('Vui l??ng nh???p t??? kh??a ????? t??m ki???m c??ng vi???c c?? li??n quan');
    }
  };

  return (
    <>
      <HeaderClient />
      <div className="wrapper-home">
        <div className="content-home-top">
          <div className="container">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={14} md={14} lg={14}>
                <h1>T??m vi???c ph?? h???p v???i b???n</h1>
                <div className="wrapper-home-container-input">
                  <div className="wrapper-home-input">
                    <div className="home-form-input-search">
                      <IconSearch />
                      <div className="home-form-input-work">
                        <input
                          type="text"
                          placeholder="T??n c??ng vi???c, v??? tr?? ???ng tuy???n"
                          onChange={e => {
                            onChangeParamUrl(e, 'search');
                          }}
                        />
                      </div>
                      <div className="home-form-input-pos">
                        <Select
                          defaultValue={!citySlice.load && 1}
                          style={{ width: 180 }}
                          onChange={e => {
                            onChangeParamUrl(e, 'address');
                          }}
                        >
                          {citySlice.data?.data?.map(item => (
                            <Option value={item.id} key={item.id}>
                              {item.city}
                            </Option>
                          ))}
                        </Select>
                      </div>
                    </div>
                    <Button className="home-btn-search" content="T??m ki???m" onclick={handleSearchJob} />
                  </div>
                  {errorSearch && <p className="form-error home-form-input-error">{errorSearch}</p>}
                </div>
                <p>C??c nh?? tuy???n d???ng h??ng ?????u Vi???t Nam</p>
                <div className="company-top">
                  {dataCompany.map(item => (
                    <div className="item-company-top" key={nanoid()}>
                      <img src={item.link} alt="" />
                    </div>
                  ))}
                </div>
              </Col>
              <Col xs={24} sm={10} md={10} lg={10} className="wrapper-banner-home">
                <div className="">
                  <img src={BannerHome} alt="" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="content-home-bottom">
          <div className="container">
            <h3 className="home-title-section">Kh??m ph?? c??ng vi???c v???i c??c vai tr?? ph??? bi???n</h3>
            <div className="wrapper-filter-chip">
              <div className={`filter-chip ${checkShowMore && `filter-chip-active`}`}>
                {dataIndustry.map(item => (
                  <p className="home-item-chip" key={nanoid()}>
                    {item.des}
                  </p>
                ))}
                {!checkShowMore && (
                  <p
                    className="home-item-chip-more"
                    onClick={() => setCheckShowMore(!checkShowMore)}
                    roles="button"
                    aria-hidden="true"
                  >
                    Xem th??m
                  </p>
                )}
              </div>
            </div>
            <div className="home-list-job">
              <div className="d-flex align-items-center home-show-all-job">
                <Link to="/viec-lam">
                  Xem th??m
                  <IconDoubleArrowRight />
                </Link>
              </div>
              <Slider {...settingsJob}>
                {jobSlice.load &&
                  ['', '', '', '', '', '', '', '', '', '', '', ''].map(() => <ItemJobLoading key={nanoid()} />)}
                {!jobSlice.load &&
                  jobSlice.data?.data?.map(item => (
                    <ItemJob
                      key={nanoid()}
                      id={item.jd_id}
                      image={item.company_logo}
                      nameJob={item.jd_title}
                      nameCompany={item.company_name}
                      salary={`${item.jd_salary_from} - ${item.jd_salary_to} tri???u`}
                      employmentType={item.type_name}
                      isFavorites={item.isFavorites}
                    />
                  ))}
              </Slider>
            </div>
            <h3 className="home-title-section">C??c c??ng ty tuy???n d???ng h??ng ?????u</h3>
            <div className="home-list-company">
              <Slider {...settingCompany}>
                {companySlice.data?.data?.map(item => (
                  <div className="home-item-company" key={nanoid()}>
                    <img src={item.company_logo} alt={item.company_name} />
                  </div>
                ))}
              </Slider>
              <div className="text-center" style={{ margin: '12px 0' }}>
                <Button
                  content="Xem t???t c???"
                  className="btn-no-background btn-no-background-hover"
                  onclick={handleChangeUrl('/cong-ty')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
