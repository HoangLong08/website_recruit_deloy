/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useParams } from 'react-router-dom';
import { Row, Col, Tabs, Modal, Button, Radio } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Footer from 'layouts/Footer/index';
import HeaderClient from 'layouts/Header/HeaderClient';
import { getDetailJobByIdAction } from 'store/actions/job';
import ButtonComponent from 'components/Button/index';
import { checkLogin } from 'store/reducers/authSlice';
import { getListCvAction, getSubmitCvAction } from 'store/actions/candidate';
import { isEmpty } from 'lodash';
import { nanoid } from 'nanoid';
import candidate from 'store/api/candidate';
import { addImage, setImageUrl } from 'store/reducers/candidateSlice';
import openNotificationWithIcon from 'utils/notification';
import DetailLoading from './DetailLoading';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { createAlert } from 'store/reducers/notificationSlice';
import './style.css';
import './progressBar.css';

const { TabPane } = Tabs;

function getExtension(filename) {
  var parts = filename.split('.');
  return parts[parts.length - 1];
}

function isFileRequire(filename) {
  var ext = getExtension(filename);
  switch (ext.toLowerCase()) {
    case 'pdf':
      return true;
    default:
      return false;
  }
}

function DetailJob() {
  const { idJob } = useParams();
  const dispatch = useDispatch();
  const jobDetailSlice = useSelector(state => state.jobSlice.detailJob);
  const listCvSlice = useSelector(state => state.candidateSlice);
  const infoUser = JSON.parse(localStorage.getItem('infoUser'));
  console.log('jobDetailSlice: ', jobDetailSlice);
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [valueCv, setValueCv] = useState({
    id: '',
    linkFile: ''
  });

  useEffect(() => {
    dispatch(
      getDetailJobByIdAction({
        idJob: idJob,
        idUser: infoUser?.info?.[0]?.user_id || 0
      })
    );
  }, [idJob, dispatch]);

  useEffect(() => {
    if (!isEmpty(jobDetailSlice.data)) {
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
    }
  }, [jobDetailSlice]);

  useEffect(() => {
    setValueCv({
      id: listCvSlice.listUploadCv?.[0]?.id,
      linkFile: listCvSlice.listUploadCv?.[0]?.linkFile
    });
  }, [listCvSlice.listUploadCv]);

  const handleApply = () => {
    if (infoUser && infoUser.token) {
      if (isBeforeToday(jobDetailState.dateExpire)) {
        dispatch(
          createAlert({
            message: 'Bài đăng đã hết thời gian nộp đơn ứng tuyển',
            type: 'success'
          })
        );
      } else {
        setIsModalVisible(true);
        dispatch(
          getListCvAction({
            idUser: infoUser.info?.[0]?.user_id
          })
        );
      }
    } else {
      dispatch(
        checkLogin({
          checkLogin: false,
          inc: 1
        })
      );
    }
  };

  const onDrop = useCallback(
    acceptedFiles => {
      if (acceptedFiles.length + listCvSlice.listUploadCv.length > 4) {
        return openNotificationWithIcon('error', 'Tối thiểu 3 file');
      }
      acceptedFiles.forEach(async (file, index) => {
        const id = nanoid() + Math.random();
        if (!isFileRequire(file.name)) {
          return openNotificationWithIcon('error', 'Vui lòng chọn file có định dạng pdf');
        } else {
          let newObj = {
            id,
            linkFile: '',
            nameFile: file.name,
            loading: true
          };
          dispatch(addImage(newObj));
          await setTimeout(async function () {
            const res = await candidate.uploadCv(file);
            dispatch(
              setImageUrl({
                id,
                url: res.data
              })
            );
          }, 1000 * (index + 1));
        }
      });
    },
    [listCvSlice]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const createMarkup = _des => {
    return { __html: _des };
  };

  const handleChangeCv = e => {
    const { value } = e.target;
    const findEle = listCvSlice.listUploadCv.filter(item => item.id === value);
    setValueCv({
      id: value,
      linkFile: findEle[0].linkFile
    });
  };

  const convertTime = _time => {
    if (_time) {
      const date = new Date(_time);
      const timeZone = 'Asia/Saigon';
      const zonedDate = utcToZonedTime(date, timeZone);
      const pattern = 'yyyy-MM-dd';
      const output = format(zonedDate, pattern, { timeZone: timeZone });
      return output;
    }
    return null;
  };

  const getUTCDate = date => {
    const d = new Date(date);
    const utcDate = new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate());
    return utcDate;
  };

  const isBeforeToday = _date => {
    const dateConvert = getUTCDate(_date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    return dateConvert < today;
  };

  const handleOk = async () => {
    await dispatch(
      getSubmitCvAction({
        idJob: jobDetailState.jdId,
        title: jobDetailState.jdTitle,
        userName: infoUser.info?.[0]?.user_name,
        recruitmentId: jobDetailState.userId,
        subTitle: '',
        linkFile: valueCv.linkFile
      })
    );
    await dispatch(
      getDetailJobByIdAction({
        idJob: idJob,
        idUser: infoUser.info?.[0]?.user_id || 0
      })
    );
    await setIsModalVisible(false);
  };

  return (
    <>
      <HeaderClient />
      {jobDetailSlice.load && <DetailLoading />}
      {!jobDetailSlice.load && (
        <div className="wrapper-detail-job">
          <div className="container">
            <div className="detail-job-header">
              <div className="detail-job-header-info">
                <img className="detail-job-header-info-image" src={jobDetailState.companyLogo} alt="" />
                <div>
                  <p className="detail-job-header-info-title">{jobDetailState.jdTitle}</p>
                  <p className="detail-job-header-info-company-name">{jobDetailState.companyName}</p>
                  <p className="detail-job-header-info-salary">{`${jobDetailState.jdSalaryFrom} - ${jobDetailState.jdSalaryTo} triệu`}</p>
                </div>
              </div>
              <div className="detail-job-apply">
                <div className="wrapper-btn-apply">
                  {jobDetailState.isSubmitted && <ButtonComponent content="Đã nộp đơn" />}
                  {!jobDetailState.isSubmitted && <ButtonComponent content="Nộp đơn" onclick={handleApply} />}
                  {/* {isBeforeToday(jobDetailState.dateExpire) && (<p>đã hết hạn nộp đơn ứng tuyển</p>)} */}
                </div>
                {/* <div>
                  <ButtonComponent content="Tạo cv" className="btn-no-background" />
                </div> */}
              </div>
            </div>
            <div className="detail-job-main">
              <Row gutter={[16, 16]}>
                <Col xs={24} sm={24} md={24} lg={24}>
                  <div className="detail-job-big-des  box-white">
                    <Tabs defaultActiveKey="1">
                      <TabPane tab="Thông tin tuyển dụng" key="1">
                        <>
                          <div className="detail-job-bottom-info">
                            <Row gutter={[4, 4]}>
                              <Col xs={24} sm={12} md={12} lg={12}>
                                <p className="detail-info-label">
                                  Địa điểm làm việc: <span>{jobDetailState.jdAddress}</span>
                                </p>
                                <p className="detail-info-label">
                                  Hình thức làm việc: <span>Full time</span>
                                </p>
                              </Col>
                              <Col xs={24} sm={12} md={12} lg={12}>
                                <p className="detail-info-label">
                                  Mức lương:{' '}
                                  <span>{`${jobDetailState.jdSalaryFrom} - ${jobDetailState.jdSalaryTo} triệu`}</span>
                                </p>
                                <p className="detail-info-label">
                                  Hết hạn nộp: <span>{convertTime(jobDetailState.dateExpire)}</span>
                                </p>
                              </Col>
                            </Row>
                          </div>
                          <div dangerouslySetInnerHTML={createMarkup(jobDetailState.jdDes)} />
                        </>
                      </TabPane>
                      <TabPane tab="Thông tin công ty" key="3">
                        <div dangerouslySetInnerHTML={createMarkup(jobDetailState.companyDes)} />
                      </TabPane>
                    </Tabs>
                  </div>
                </Col>
                {/* <Col xs={24} sm={8} md={8} lg={8}>
                  <div className="detail-job-sam-job box-white">
                    <p>Công việc bạn có thể quan tâm</p>
                  </div>
                  <div className="detail-job-big-des box-white">
                    <p>Hỏi đáp</p>
                  </div>
                </Col> */}
              </Row>
            </div>
          </div>
        </div>
      )}

      <Modal
        title="Danh sách cv của bạn"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk} disabled={listCvSlice.listUploadCv?.length === 0}>
            Nộp CV
          </Button>
        ]}
      >
        {listCvSlice.data?.length === 0 && (
          <>
            <p>Bạn chưa có cv. Hãy nhấn nút tạo ngay !</p>
            <section>
              <div
                {...getRootProps({ className: `dropzone ${isDragActive ? 'dropzone-active' : 'dropzone-no-active'}` })}
              >
                <input {...getInputProps()} />
                {isDragActive ? 'Thả ảnh ở đây' : 'Nhấn hoặc kéo thả vào để tải cv lên'}
              </div>
              <div>
                <h4>Danh sách cv</h4>
                {listCvSlice.listUploadCv.length === 0 && <h3>Rỗng</h3>}
                {listCvSlice.listUploadCv.length > 0 && (
                  <Radio.Group size="large" value={valueCv.id} onChange={handleChangeCv} style={{ width: '100%' }}>
                    {listCvSlice.listUploadCv.map(item => (
                      <Radio
                        value={item.id}
                        key={item.id}
                        className="wrapper-modal-apply-item"
                        style={{ width: '100%' }}
                      >
                        <div className="wrapper-modal-apply-info">
                          <p>{item.nameFile}</p>
                          <span className="wrapper-modal-apply-show-cv">Xem cv</span>
                        </div>
                        {item.loading && (
                          <div className="wrapper-modal-apply-progress">
                            <div className="requestProgress">
                              <div className="bar" />
                            </div>
                          </div>
                        )}
                      </Radio>
                    ))}
                  </Radio.Group>
                )}
              </div>
            </section>
          </>
        )}
        {listCvSlice.data?.length > 0 && <p>Danh sach cv</p>}
      </Modal>
      <Footer />
    </>
  );
}

export default DetailJob;
