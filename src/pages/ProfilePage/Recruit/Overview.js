import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import TableComponent from 'components/TableComponent/index';
import axios from 'axios';
import authHeader from 'services/authHeader';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

ChartJS.register(ArcElement, Tooltip, Legend);

const columnTwo = [
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Hạn nộp',
    dataIndex: 'time',
    key: 'time'
  }
];

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

function Overview() {
  const [dataOverview, setDataOverview] = useState({});
  console.log('dataOverview: ', dataOverview);
  useEffect(() => {
    const fetchData = async () => {//5000
      const result = await axios.get(process.env.REACT_APP_URL_API + '/api/user/recruit/dashboard', { headers: authHeader() });
      setDataOverview(result.data.data);
    };
    fetchData();
  }, []);

  const data = {
    labels: ['Tin tuyển dụng đã duyệt', 'Tin tuyển dụng từ chối'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
        data: [dataOverview.total_no_approve, dataOverview.total_approve]
      }
    ]
  };

  const renderDataSource = () => {
    return dataOverview?.list_transaction?.map(item => {
      return {
        key: nanoid(),
        title: item.jd_title,
        time: convertTime(item.date_expire)
      };
    });
  };

  return (
    <>
      <div style={{ paddingBottom: '12px' }}>
        <Row gutter={[12, 12]}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="box-manage-profile">
              <p>Tổng số bài đăng</p>
              <h1>{dataOverview.total_jd}</h1>
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="box-manage-profile">
              <p>Tổng số đơn ứng tuyển</p>
              <h1>{dataOverview.total_transaction}</h1>
            </div>
          </Col>
        </Row>
      </div>
      <div style={{ marginBottom: '12px' }}>
        <Row gutter={[12, 12]}>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="box-manage-profile">
              <p>Biểu đồ</p>
              <Doughnut
                data={data}
                options={{
                  legend: {
                    display: false
                  }
                }}
              />
            </div>
          </Col>
          <Col xs={12} sm={12} md={12} lg={12}>
            <div className="box-manage-profile">
              <h3 className="title-box-manage-profile">Danh sách ứng tuyển </h3>
              <TableComponent data={renderDataSource()} tableHead={columnTwo} />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Overview;
