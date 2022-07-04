import React, { useState, useEffect } from 'react';
import { Button, Space, Modal, Select, Tag } from 'antd';
import SearchInput from '../Candidate/SearchInput';
import TableComponent from 'components/TableComponent/index';
import { deleteJobByIdAction, getListJobByRecruiterAction } from 'store/actions/job';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import './style.css';
import { getCompanyByIdUserAction } from 'store/actions/company';

const { Option } = Select;

const columns = [
  {
    title: 'Chức danh',
    dataIndex: 'position',
    key: 'position'
  },
  {
    title: 'Ngày đăng',
    dataIndex: 'date',
    key: 'date'
  },
  {
    title: 'Ngày hết hạn',
    dataIndex: 'dateExpire',
    key: 'dateExpire'
  },
  {
    title: 'Lượt nộp',
    dataIndex: 'numberSubmitted',
    key: 'numberSubmitted'
  },
  {
    title: 'Trạng thái bài viết',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Thao tác',
    dataIndex: 'action',
    key: 'action'
  }
];

function Posts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authSlice = useSelector(state => state.authSlice);
  const listJobByRecruiterSlice = useSelector(state => state.jobSlice.listJobByRecruiter);
  // const companySlice = useSelector(state => state.companySlice.listCompanyByIdUser);
  const [isModalVisible, setIsModalVisible] = useState();

  console.log('listJobByRecruiterSlice: ', listJobByRecruiterSlice);

  useEffect(() => {
    dispatch(
      getListJobByRecruiterAction({
        jdTitle: '',
        statusJdId: '',
        typeId: '',
        companyName: ''
      })
    );

    dispatch(
      getCompanyByIdUserAction({
        idUser: authSlice.data?.info?.[0]?.user_id
      })
    );
  }, [dispatch, authSlice.data]);

  const redirectUrl = _url => () => {
    navigate(_url);
  };

  const convertTime = _time => {
    const date = new Date(_time);
    const timeZone = 'Asia/Saigon';
    const zonedDate = utcToZonedTime(date, timeZone);
    const pattern = 'dd-MM-yyyy HH:mm:ss';
    const output = format(zonedDate, pattern, { timeZone: timeZone });
    return output;
  };

  const showModal = _idJob => () => {
    setIsModalVisible(_idJob);
  };

  const handleOk = () => {
    dispatch(deleteJobByIdAction({ idJob: isModalVisible }));
    setIsModalVisible();
  };

  const handleCancel = () => {
    setIsModalVisible();
  };

  // const handleChangeCompany = e => {
  //   console.log('handleChangeCompany: ', handleChangeCompany);
  // };

  const renderDataSource = () => {
    return listJobByRecruiterSlice?.data?.map(item => {
      return {
        key: nanoid(),
        position: item.jd_title,
        date: convertTime(item.jd_updated),
        dateExpire: convertTime(item.date_expire),
        numberSubmitted: item.total_cv,
        status:
          item.is_accepted === false ? <Tag color="warning">đang duyệt</Tag> : <Tag color="success">Đã phát hành</Tag>,
        action: (
          <Space size="small">
            <Button
              type="primary"
              onClick={redirectUrl('/trang-ca-nhan/danh-sach-bai-dang/ung-vien-da-nop-cv/' + item.jd_id)}
            >
              Danh sách ứng tuyển
            </Button>
            <Button
              type="primary"
              onClick={redirectUrl('/trang-ca-nhan/danh-sach-bai-dang/chinh-sua-bai-tuyen-dung/' + item.jd_id)}
            >
              Sửa
            </Button>
            <Button danger onClick={showModal(item.jd_id)}>
              Xóa
            </Button>
          </Space>
        )
      };
    });
  };

  return (
    <div className="wrapper-content-inner-client customize-scroll">
      <div className="content-inner-client-head">
        <p className="content-inner-client-head-title">Danh sách đăng tuyển</p>
        <div className="content-inner-client-head-action">
          {/* <SearchInput /> */}
          {/* <div>
            <Select defaultValue={0} style={{ width: 150 }} onChange={handleChangeCompany}>
              <Option value={0}>Tất cả</Option>
              {companySlice?.data?.data?.map(item => (
                <Option value={item.company_id} key={nanoid()}>
                  {item.company_name}
                </Option>
              ))}
            </Select>
          </div> */}
          <Button type="primary" onClick={() => navigate('/trang-ca-nhan/danh-sach-bai-dang/them-bai-tuyen-dung')}>
            Thêm tin tuyển dụng
          </Button>
        </div>
      </div>
      <div className="content-inner-client-bottom">
        <TableComponent data={renderDataSource()} tableHead={columns} loading={listJobByRecruiterSlice.load} />
      </div>
      <Modal title="Xóa tin tuyển dụng" visible={isModalVisible ? true : false} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn có muốn xóa tin tuyển dụng này không? </p>
      </Modal>
    </div>
  );
}

export default Posts;
