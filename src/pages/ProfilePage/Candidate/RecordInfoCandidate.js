import React, { useEffect, useState } from 'react';
import { Input, Collapse, Row, Col, Button, DatePicker } from 'antd';
import CKeditor from 'components/CKEditor/index';
import { useDispatch, useSelector } from 'react-redux';
import { getRecodePersonalAction, updateRecordPersonalAction } from 'store/actions/candidate';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Panel } = Collapse;

function RecordInfoCandidate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const recordPersonalSlice = useSelector(state => state.candidateSlice.recordPersonal);
  const authSlice = useSelector(state => state.authSlice);
  console.log('recordPersonalSlice: ', recordPersonalSlice);
  const [valueForm, setValueForm] = useState({
    // myInfo: '',
    skill: '',
    informatics: '',
    foreignLanguage: '',
    certificate: '',
    nameSchool: '',
    industry: '',
    timeBeginLearn: '',
    timeEndLearn: '',
    nameCompany: '',
    jobTitle: '', // job title in the company
    desJob: '',
    timeBeginJob: '',
    timeEndJob: '',
    isWorking: false
  });

  const [editorState, setEditorState] = useState(''); // myInfo: ''
  useEffect(() => {
    dispatch(
      getRecodePersonalAction({
        idUser: authSlice.data?.info[0]?.user_id
      })
    );
  }, [dispatch, authSlice.data]);

  useEffect(() => {
    if (!recordPersonalSlice.load) {
      const {
        desired_salary,
        education,
        experience,
        language,
        level_desired,
        my_information,
        office_information,
        skill
      } = recordPersonalSlice.data;
      setValueForm({
        myInfo: '',
        skill: skill,
        informatics: office_information,
        foreignLanguage: language,
        certificate: education?.certificate,
        nameSchool: education?.school,
        industry: education?.specialized,
        timeBeginLearn: education?.date_begin,
        timeEndLearn: education?.date_end,
        nameCompany: experience?.company,
        jobTitle: experience?.position, // job title in the company
        desJob: experience?.position,
        timeBeginJob: experience?.exp_date_begin,
        timeEndJob: experience?.exp_date_end,
        isWorking: experience?.is_working
      });

      setEditorState(my_information);
    }
  }, [recordPersonalSlice]);

  const handleChange = (e, field) => {
    if (field) {
      setValueForm({
        ...valueForm,
        [field]: e
      });
    } else {
      console.log('e: ', e);
      console.log('e?.target: ', e?.target);
      const { name, value } = e?.target;
      setValueForm({
        ...valueForm,
        [name]: value
      });
    }
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

  console.log('convertTime: ', convertTime(valueForm.timeBeginJob));

  const handleSubmit = async () => {
    const res = await dispatch(
      updateRecordPersonalAction({
        ...valueForm,
        myInfo: editorState
      })
    );
    console.log('res: ', res);
    if (!isEmpty(res.payload)) {
      await navigate(-1);
    }
  };

  return (
    <div>
      <Collapse>
        <Panel header="Thông tin chung" key="1">
          <div className="form-group">
            <p>Thông tin chung</p>
            <CKeditor valueEditor={editorState} onChangeEditor={e => setEditorState(e)} />
          </div>
          <Button type="primary" onClick={handleSubmit}>
            Cập nhập
          </Button>
        </Panel>
        <Panel header="Kỹ năng" key="2">
          <div className="form-group form-group-width">
            <p>Tên kỹ năng mềm / kỹ năng cứng </p>
            <Input
              name="skill"
              size="large"
              placeholder="E.g. Làm việc nhóm, Làm việc độc lập..."
              allowClear
              value={valueForm.skill || ''}
              onChange={handleChange}
            />
            {/* {errorFormPass.passwordOld?.length > 0 && (
              <small className="form-error">{errorFormPass.passwordOld}</small>
            )} */}
          </div>
          <Button type="primary" onClick={handleSubmit}>
            Cập nhập
          </Button>
        </Panel>
        <Panel header="Tin học" key="3">
          <div className="form-group form-group-width">
            <p>Tên phần mềm</p>
            <Input
              name="informatics"
              size="large"
              placeholder="E.g. Excel..."
              allowClear
              value={valueForm.informatics || ''}
              onChange={handleChange}
            />
            {/* {errorFormPass.passwordOld?.length > 0 && (
              <small className="form-error">{errorFormPass.passwordOld}</small>
            )} */}
          </div>
          <Button type="primary" onClick={handleSubmit}>
            Cập nhập
          </Button>
        </Panel>
        <Panel header="Ngoại ngữ" key="4">
          <div className="form-group form-group-width">
            <p>Tên ngoại ngữ và mức độ thành thạo</p>
            <Input
              name="foreignLanguage"
              size="large"
              placeholder="Tiếng anh - cơ bản"
              allowClear
              value={valueForm.foreignLanguage || ''}
              onChange={handleChange}
            />
            {/* {errorFormPass.passwordOld?.length > 0 && (
              <small className="form-error">{errorFormPass.passwordOld}</small>
            )} */}
          </div>
          <Button type="primary" onClick={handleSubmit}>
            Cập nhập
          </Button>
        </Panel>
        <Panel header="Thông tin học vấn" key="5">
          <Row gutter={[16, 16]}>
            <Col xs={16} sm={16} md={16} lg={16}>
              <div className="form-group">
                <p>Tên bằng cấp / chứng chỉ</p>
                <Input
                  name="certificate"
                  size="large"
                  placeholder="E.g. Bằng Cao Đẳng CNTT, Chứng chỉ nghề điện công nghiệp"
                  allowClear
                  value={valueForm.certificate || ''}
                  onChange={handleChange}
                />
                {/* {errorFormPass.passwordOld?.length > 0 && (
              <small className="form-error">{errorFormPass.passwordOld}</small>
            )} */}
              </div>
              <div className="form-group">
                <p>Trường / Trung tâm đào tạo</p>
                <Input
                  name="nameSchool"
                  size="large"
                  placeholder=""
                  allowClear
                  value={valueForm.nameSchool || ''}
                  onChange={handleChange}
                />
                {/* {errorFormPass.passwordOld?.length > 0 && (
              <small className="form-error">{errorFormPass.passwordOld}</small>
            )} */}
              </div>
              <div className="form-group ">
                <p>Chuyên ngành đào tạo</p>
                <Input
                  name="industry"
                  size="large"
                  placeholder=""
                  allowClear
                  value={valueForm.industry || ''}
                  onChange={handleChange}
                />
                {/* {errorFormPass.passwordOld?.length > 0 && (
              <small className="form-error">{errorFormPass.passwordOld}</small>
            )} */}
              </div>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <div className="form-group ">
                <p>Thời gian bắt đầu</p>
                <DatePicker
                  size="large"
                  name="timeBeginLearn"
                  // value={valueForm.timeBeginLearn || ""}
                  onChange={(date, dateString) => handleChange(dateString, 'timeBeginLearn')}
                  format="YYYY-MM-DD"
                />
              </div>
              <div className="form-group">
                <p>Thời gian kết thúc</p>
                <DatePicker
                  size="large"
                  name="timeEndLearn"
                  onChange={(date, dateString) => handleChange(dateString, 'timeEndLearn')}
                  format="YYYY-MM-DD"
                />
              </div>
            </Col>
          </Row>
          <Button type="primary" onClick={handleSubmit}>
            Cập nhập
          </Button>
        </Panel>
        <Panel header="Kinh nghiệm làm việc" key="6">
          <Row gutter={[16, 16]}>
            <Col xs={16} sm={16} md={16} lg={16}>
              <Row gutter={[16, 16]}>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div className="form-group">
                    <p>Công ty</p>
                    <Input
                      name="nameCompany"
                      size="large"
                      placeholder=""
                      allowClear
                      value={valueForm.nameCompany || ''}
                      onChange={handleChange}
                    />
                    {/* {errorFormPass.passwordOld?.length > 0 && (
              <small className="form-error">{errorFormPass.passwordOld}</small>
            )} */}
                  </div>
                </Col>
                <Col xs={12} sm={12} md={12} lg={12}>
                  <div className="form-group">
                    <p>Chức danh</p>
                    <Input
                      name="jobTitle"
                      size="large"
                      placeholder=""
                      allowClear
                      value={valueForm.jobTitle || ''}
                      onChange={handleChange}
                    />
                    {/* {errorFormPass.passwordOld?.length > 0 && (
              <small className="form-error">{errorFormPass.passwordOld}</small>
            )} */}
                  </div>
                </Col>
              </Row>
              <div className="form-group">
                <p>Mô tả công việc</p>
                <TextArea name="desJob" value={valueForm.desJob || ''} onChange={handleChange} />
              </div>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8}>
              <p>Thời gian bắt đầu</p>
              <div className="form-group">
                <DatePicker
                  size="large"
                  name="timeBeginJob"
                  onChange={(date, dateString) => handleChange(dateString, 'timeBeginJob')}
                  format="YYYY-MM-DD"
                />
              </div>
              <p>Thời gian kết thúc</p>
              <div className="form-group">
                <DatePicker
                  size="large"
                  name="timeEndJob"
                  onChange={(date, dateString) => handleChange(dateString, 'timeEndJob')}
                  format="YYYY-MM-DD"
                />
              </div>
            </Col>
          </Row>
          <Button type="primary" onClick={handleSubmit}>
            Cập nhập
          </Button>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RecordInfoCandidate;
