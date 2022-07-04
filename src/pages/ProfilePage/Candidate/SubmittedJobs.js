import React, { useState, useEffect } from 'react';
import { Button, Modal, Tag } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import TableComponent from 'components/TableComponent/index';
import SearchInput from './SearchInput';
import { getListJobApplyByIdUserAction } from 'store/actions/job';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { cancelSubmittedCvAction } from 'store/actions/candidate';

const columns = [
  {
    title: 'Tên công ty',
    dataIndex: 'nameCompany',
    key: 'nameCompany'
  },
  {
    title: 'Chức danh',
    dataIndex: 'position',
    key: 'position'
  },
  {
    title: 'Ngày nộp',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Hồ sơ ứng tuyển',
    dataIndex: 'record',
    key: 'record'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: 100
  }
];

function SubmittedJobs() {
  const dispatch = useDispatch();
  const jobSlice = useSelector(state => state.jobSlice.applyJobs);
  const [visible, setVisible] = useState(''); // xem cv
  console.log('visible: ', visible);
  useEffect(() => {
    dispatch(
      getListJobApplyByIdUserAction({
        pageIndex: 1,
        pageSize: 999,
        statusTransactionId: null,
        companyName: ''
      })
    );
  }, [dispatch]);

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

  const renderDataSource = () => {
    return jobSlice?.data?.map(item => {
      return {
        key: nanoid(),
        nameCompany: item.company_name,
        position: item.jd_title,
        date: convertTime(item.transaction_updated),
        record: (
          <Button type="link" onClick={() => setVisible('show-' + item.transaction_cv)}>
            Xem cv
          </Button>
        ),
        status: <Tag> {item.status_transaction_name} </Tag>,
        action: (
          <Button
            danger
            onClick={() => setVisible('submit-' + item.transaction_id)}
            disabled={item.status_transaction_id !== 1}
          >
            Hủy nộp
          </Button>
        )
      };
    });
  };

  const renderErrorCv = error => {
    let message = '';
    switch (error.name) {
      case 'InvalidPDFException':
        message = 'The document is invalid or corrupted';
        break;
      case 'MissingPDFException':
        message = 'Không tìm thấy file này';
        break;
      case 'UnexpectedResponseException':
        message = 'Unexpected server response';
        break;
      default:
        message = 'Cannot load the document';
        break;
    }

    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            backgroundColor: '#e53e3e',
            borderRadius: '0.25rem',
            color: '#fff',
            padding: '0.5rem'
          }}
        >
          {message}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="wrapper-content-inner-client customize-scroll">
        <div className="content-inner-client-head">
          <p className="content-inner-client-head-title">Việc làm đã nộp</p>
          <div>
            <SearchInput />
          </div>
        </div>
        <div className="content-inner-client-bottom">
          <TableComponent data={renderDataSource()} tableHead={columns} loading={jobSlice?.load} />
        </div>
      </div>
      <Modal
        title={visible.split('-')[0] === 'show' ? 'Cv' : 'Hủy nộp'}
        centered
        visible={visible ? true : false}
        onOk={async () => {
          if (visible.split('-')[0] === 'submit') {
            await dispatch(
              cancelSubmittedCvAction({
                idTransaction: visible.split('-')[1]
              })
            );
            await dispatch(
              getListJobApplyByIdUserAction({
                pageIndex: 1,
                pageSize: 999,
                statusTransactionId: null,
                companyName: ''
              })
            );
          }
          await setVisible('');
        }}
        onCancel={() => setVisible('')}
        width={visible.split('-')[0] === 'show' && 1000}
      >
        {/* {visible.split('-')[0] === 'show' && (
          <div
            style={{
              height: '100%'
            }}
          >
            <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.13.216/pdf.worker.min.js">
              <Viewer fileUrl={visible.split('-')[1]} renderError={renderErrorCv} />
            </Worker>
          </div>
        )} */}
        {visible.split('-')[0] === 'show' && (
          <a href={visible.split('-')[1]} target="_blank">
            xem cv
          </a>
        )}
        {visible.split('-')[0] === 'submit' && <p>Bạn có muốn hủy nộp đơn tuyển dụng dùng này không ?</p>}
      </Modal>
    </>
  );
}

export default SubmittedJobs;
