import React, { useState, useEffect } from 'react';
import TableComponent from 'components/TableComponent/index';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { confirmAcceptOrRejectCvAction, getListCvByIdJobAction } from 'store/actions/job';
import { Button, Space, Modal } from 'antd';
import { nanoid } from 'nanoid';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const columns = [
  {
    title: 'Chức danh',
    dataIndex: 'position',
    key: 'position'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email'
  },
  {
    title: 'Số điện thoại',
    dataIndex: 'phone',
    key: 'phone'
  },
  {
    title: 'Họ và tên',
    dataIndex: 'fullName',
    key: 'fullName'
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    key: 'gender'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Thao tác',
    dataIndex: 'action',
    key: 'action',
    width: 200
  }
];

function ListCvOfJob() {
  const { idPost } = useParams();
  const dispatch = useDispatch();
  const listCvByIdJob = useSelector(state => state.jobSlice.listCvByIdJob);
  const [visible, setVisible] = useState(); // xem cv
  const authSlice = useSelector(state => state.authSlice);
  const [confirmCv, setConfirmCv] = useState({ type: '', idTransaction: '' });
  useEffect(() => {
    dispatch(
      getListCvByIdJobAction({
        idJob: idPost
      })
    );
  }, [dispatch, idPost]);

  const handleConfirmCv = () => {
    dispatch(
      confirmAcceptOrRejectCvAction({
        statusTransactionId: confirmCv.type === 'accept' ? 5 : 3,
        transactionId: parseInt(confirmCv.idTransaction),
        idPost,
        userId: confirmCv.idUserSubmitted,
        recruitmentId: authSlice.data?.info?.[0]?.user_id
      })
    );
    setConfirmCv({ type: '', idTransaction: '' });
  };

  const renderDataSource = () => {
    return listCvByIdJob?.data?.map(item => {
      return {
        key: nanoid(),
        position: item.jd_title,
        email: item.user_email,
        fullName: item.user_name,
        phone: item.user_phone,
        gender: item.user_gender,
        status: item.status_transaction_name,
        action: (
          <Space size="small">
            <Button type="primary" onClick={() => setVisible(item.transaction_cv)}>
              Xem cv
            </Button>
            <Button
              type="primary"
              onClick={() =>
                setConfirmCv({ idTransaction: item.transaction_id, type: 'accept', idUserSubmitted: item.user_id })
              }
              disabled={item.status_transaction_id !== 1}
            >
              Đồng ý
            </Button>
            <Button
              danger
              onClick={() =>
                setConfirmCv({ idTransaction: item.transaction_id, type: 'reject', idUserSubmitted: item.user_id })
              }
              disabled={item.status_transaction_id !== 1}
            >
              Từ chối
            </Button>
          </Space>
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
    <div className="wrapper-content-inner-client customize-scroll">
      <div className="content-inner-client-head">
        <p className="content-inner-client-head-title">Danh sách ứng viên đã nộp cv</p>
      </div>
      <div className="content-inner-client-bottom">
        <TableComponent data={renderDataSource()} tableHead={columns} loading={listCvByIdJob.load} />
      </div>

      <Modal
        title="Cv"
        centered
        visible={visible ? true : false}
        onOk={() => setVisible()}
        onCancel={() => setVisible()}
        width={1000}
      >
        <div
          style={{
            height: '100%'
          }}
        >
          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.13.216/pdf.worker.min.js">
            <Viewer fileUrl={visible} renderError={renderErrorCv} />
          </Worker>
        </div>
      </Modal>
      <Modal
        title="Xác nhân CV"
        centered
        visible={confirmCv.type ? true : false}
        onOk={handleConfirmCv}
        onCancel={() => setConfirmCv({ type: '', idTransaction: '' })}
      >
        <p>Bạn {confirmCv.type === 'accept' ? ' đồng ý ' : ' từ chối '}với cv này ?</p>
      </Modal>
    </div>
  );
}

export default ListCvOfJob;
