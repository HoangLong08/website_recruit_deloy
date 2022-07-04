import React, { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import { nanoid } from 'nanoid';
import TableComponent from 'components/TableComponent/index';
import axios from 'axios';
import authHeader from 'services/authHeader';

const columnOne = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'number',
    key: 'number'
  }
];

const columnTwo = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'number',
    key: 'number'
  }
];

function Overview() {
  const [dataOverview, setDataOverview] = useState({});
  console.log('dataOverview: ', dataOverview);
  useEffect(() => {
    const fetchData = async () => {//5000
      const result = await axios.get(process.env.REACT_APP_URL_API + '/api/user/admin/dashboard', { headers: authHeader() });
      setDataOverview(result.data.data);
    };
    fetchData();
  }, []);

  const renderDataSourceOne = () => {
    return dataOverview?.recruit?.map(item => {
      return {
        key: nanoid(),
        name: item.user_name,
        email: item.user_email,
        number: item.user_phone
      };
    });
  };

  const renderDataSourceTwo = () => {
    return dataOverview?.user?.map(item => {
      return {
        key: nanoid(),
        name: item.user_name,
        email: item.user_email,
        number: item.user_phone
      };
    });
  };

  return (
    <div>
      <Row gutter={[12, 12]}>
        <Col xs={8} sm={8} md={8} lg={8}>
          <div className="box-manage-profile">
            <p>Tổng số bài đăng</p>
            <h1>{dataOverview.total_jd}</h1>
          </div>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8}>
          <div className="box-manage-profile">
            <p>Tổng số người dùng</p>
            <h1>{dataOverview.total_user}</h1>
          </div>
        </Col>
        <Col xs={8} sm={8} md={8} lg={8}>
          <div className="box-manage-profile">
            <p>Tổng số ứng tuyển</p>
            <h1>{dataOverview.total_transaction}</h1>
          </div>
        </Col>
      </Row>
      <div style={{ marginTop: '12px' }}>
        <Row gutter={[12, 12]}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="box-manage-profile">
              <h3 className="title-box-manage-profile">Danh sách tuyển dụng mới nhất</h3>
              <TableComponent data={renderDataSourceOne()} tableHead={columnOne} />
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="box-manage-profile">
              <h3 className="title-box-manage-profile">Danh sách ứng viên mới nhất </h3>
              <TableComponent data={renderDataSourceTwo()} tableHead={columnTwo} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Overview;
