import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import TableComponent from 'components/TableComponent/index';
import axios from 'axios';
import './style.css';
import authHeader from 'services/authHeader';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  },
  {
    key: '3',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
  },
  {
    key: '4',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  }
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }
];

function Profile() {
  const [dataOverview, setDataOverview] = useState({});
  console.log('dataOverview: ', dataOverview);
  useEffect(() => {
    const fetchData = async () => {//5000
      const result = await axios.get(process.env.REACT_APP_URL_API + '/api/website/overview/recruit', { headers: authHeader() });
      setDataOverview(result.data.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div style={{ paddingBottom: '12px' }}>
        <Row gutter={[12, 12]}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="box-manage-profile">
              <p>Tổng số công việc yêu thích</p>
              <h1>{dataOverview.totalJD}</h1>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="box-manage-profile">
              <p>Tổng số công việc yêu thích</p>
              <h1>{dataOverview.totalCV}</h1>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: '12px' }}>
        <Row gutter={[12, 12]}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="box-manage-profile">
              <h3 className="title-box-manage-profile">Công ty hàng đầu</h3>
              <TableComponent data={dataSource} tableHead={columns} />
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="box-manage-profile">
              <h3 className="title-box-manage-profile">Công việc phù hợp với bạn </h3>
              <TableComponent data={dataSource} tableHead={columns} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Profile;
