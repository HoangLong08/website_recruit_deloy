import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Space, Modal, Spin } from 'antd';
import TableComponent from 'components/TableComponent/index';
import { nanoid } from 'nanoid';
import { approvePostAction, getListApprovePostAction } from 'store/actions/admin';
import { isEmpty } from 'lodash';
import { getDetailJobByIdAction } from 'store/actions/job';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

const columns = [
  {
    title: 'Tên công ty',
    dataIndex: 'nameCompany',
    key: 'nameCompany'
  },
  {
    title: 'Tiêu đề tuyển dụng',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Ngày tạo bài',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action'
  }
];

function ApprovePosts() {
  const dispatch = useDispatch();
  const listApprovePost = useSelector(state => state.adminSlice.listApprovePost);
  const jobDetailSlice = useSelector(state => state.jobSlice.detailJob);
  const [isModalVisible, setIsModalVisible] = useState({
    type: '',
    info: ''
  });

  const [jobDetailState, setJobDetailState] = useState({
    jdId: '',
    companyName: '',
    companyLogo: '',
    jdTitle: '',
    jdDes: '',
    jdAddress: '',
    jdSalaryFrom: '',
    jdSalaryTo: '',
    dateExpire: '',
    companyDes: '',
    isSubmitted: false,
    userId: 0
  });

  useEffect(() => {
    dispatch(getListApprovePostAction({ orderBy: 'done_accepted' }));
  }, [dispatch]);

  useEffect(() => {
    const {
      jd_id,
      company_name,
      company_logo,
      jd_title,
      jd_des,
      jd_address,
      jd_salary_from,
      jd_salary_to,
      date_expire,
      company_des,
      isSubmitted,
      user_id
    } = jobDetailSlice.data;
    setJobDetailState({
      jdId: jd_id,
      companyName: company_name,
      companyLogo: company_logo,
      jdTitle: jd_title,
      jdDes: jd_des,
      jdAddress: jd_address,
      jdSalaryFrom: jd_salary_from,
      jdSalaryTo: jd_salary_to,
      dateExpire: date_expire,
      companyDes: company_des,
      isSubmitted: isSubmitted,
      userId: user_id
    });
  }, [jobDetailSlice]);

  const handleOk = async () => {
    if (isModalVisible.type === 'post') {
      await dispatch(approvePostAction({ idPost: isModalVisible.info }));
      await dispatch(getListApprovePostAction({ orderBy: 'done_accepted' }));
    } else {
      console.log('123');
    }
    setIsModalVisible({
      type: '',
      info: ''
    });
  };

  const handleCancel = () => {
    setIsModalVisible({
      type: '',
      info: ''
    });
  };

  const handleApprove = (_idPost, _isAccept) => () => {
    setIsModalVisible({
      type: 'post',
      info: _idPost,
      isAccepted: _isAccept
    });
  };

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

  const createMarkup = _des => {
    return { __html: _des };
  };

  const renderDataSource = () => {
    return listApprovePost.data?.map(item => {
      return {
        key: nanoid(),
        nameCompany: item.company_name,
        title: item.jd_title,
        time: convertTime(item.jd_updated),
        action: (
          <Space size="small">
            <Button
              type="primary"
              onClick={async () => {
                await dispatch(
                  getDetailJobByIdAction({
                    idJob: item.jd_id,
                    idUser: 0
                  })
                );

                await setIsModalVisible({
                  type: 'detail',
                  info: item.jd_id
                });
              }}
            >
              Xem chi tiết
            </Button>
            <Button
              type={item.is_accepted === true ? 'danger' : 'primary'}
              onClick={handleApprove(item.jd_id, item.is_accepted)}
            >
              {item.is_accepted === true ? 'Khóa bài viết' : 'Duyệt bài viết'}
            </Button>
          </Space>
        )
      };
    });
  };

  return (
    <div className="wrapper-content-inner-client customize-scroll">
      <div className="content-inner-client-head">
        <p className="content-inner-client-head-title">Danh sách tin tuyển dụng</p>
      </div>
      <div className="content-inner-client-bottom">
        <TableComponent data={renderDataSource()} tableHead={columns} loading={listApprovePost.load} />
      </div>

      <Modal
        title="Modal"
        visible={isEmpty(isModalVisible.type) ? false : true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {isModalVisible.type === 'post' &&
          (
            !isModalVisible.isAccepted ? <p>Bạn duyệt bài này không ?</p> : <p>Bạn có chắn chắn khóa bài viết này không ?</p>
          )}
        {isModalVisible.type === 'detail' && (
          <>
            {jobDetailSlice.load && (
              <div className="wrapper-loading-content">
                <Spin size="large" />
              </div>
            )}
            {!jobDetailSlice.load && (
              <>
                <div>
                  <h4>{jobDetailState.jdTitle}</h4>
                  <p className="detail-job-header-info-company-name">{jobDetailState.companyName}</p>
                  <p className="detail-info-label">
                    Lương:{' '}
                    <span>
                      {jobDetailState.jdSalaryFrom} - {jobDetailState.jdSalaryTo} triệu
                    </span>
                  </p>
                  <p className="detail-info-label">
                    Địa điểm làm việc: <span>{jobDetailState.jdAddress}</span>
                  </p>
                  <p className="detail-info-label">
                    Hình thức làm việc: <span>Full time</span>
                  </p>
                  <p className="detail-info-label">
                    Mức lương:
                    <span>{`${jobDetailState.jdSalaryFrom} - ${jobDetailState.jdSalaryTo} triệu`}</span>
                  </p>
                  <p className="detail-info-label">
                    Hết hạn nộp: <span>{convertTime(jobDetailState.dateExpire)}</span>
                  </p>
                  <div dangerouslySetInnerHTML={createMarkup(jobDetailState.jdDes)} />
                </div>
              </>
            )}
          </>
        )}
      </Modal>
    </div>
  );
}

export default ApprovePosts;
