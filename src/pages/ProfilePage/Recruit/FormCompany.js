import React, { useState, useEffect, useCallback } from 'react';
import { Space, Button, Input, DatePicker } from 'antd';
import CKeditor from 'components/CKEditor';
import { useNavigate, useParams } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { getDetailCompanyAction } from 'store/actions/company';
import candidate from 'store/api/candidate';
import { createCompanyAction, editCompanyAction } from 'store/actions/company';

function FormCompany({ type }) {
  const { idCompany } = useParams();
  const dispatch = useDispatch();
  const navigator = useNavigate();

  const detailCompanySlice = useSelector(state => state.companySlice.detailCompany);

  const [valueForm, setValueForm] = useState({
    logoCompany: '',
    nameCompany: '',
    websiteCompany: '',
    addressCompany: '',
    totalEmployee: '',
    serviceCompany: '',
    estCompany: ''
  });

  const [editorState, setEditorState] = useState('');

  useEffect(() => {
    if (!isEmpty(type) && !isEmpty(idCompany)) {
      dispatch(
        getDetailCompanyAction({
          idCompany: idCompany
        })
      );
    }
  }, [type, dispatch, idCompany]);

  useEffect(() => {
    if (!isEmpty(type) && !isEmpty(idCompany)) {
      setValueForm({
        logoCompany: detailCompanySlice.data?.company_logo,
        nameCompany: detailCompanySlice.data?.company_name,
        websiteCompany: detailCompanySlice.data?.company_website,
        addressCompany: detailCompanySlice.data?.company_address,
        totalEmployee: detailCompanySlice.data?.company_member,
        serviceCompany: detailCompanySlice.data?.company_service,
        estCompany: detailCompanySlice.data?.company_establish
      });
      setEditorState(detailCompanySlice.data?.company_des);
    }
  }, [type, detailCompanySlice.data, idCompany]);

  const onDrop = useCallback(
    async acceptedFiles => {
      setValueForm({
        ...valueForm,
        logoCompany: URL.createObjectURL(acceptedFiles[0])
      });
      const res = await candidate.uploadCv(acceptedFiles[0]);
      setValueForm({
        ...valueForm,
        logoCompany: res.data
      });
    },
    [valueForm]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  const onChangeInfoAccount = (e, _field) => {
    let newObj = {
      ...valueForm
    };

    if (_field === 'nameCompany') {
      newObj = {
        ...newObj,
        nameCompany: e.target.value
      };
    }
    if (_field === 'websiteCompany') {
      newObj = {
        ...newObj,
        websiteCompany: e.target.value
      };
    }
    if (_field === 'totalEmployee') {
      newObj = {
        ...newObj,
        totalEmployee: e.target.value
      };
    }
    if (_field === 'serviceCompany') {
      newObj = {
        ...newObj,
        serviceCompany: e.target.value
      };
    }
    if (_field === 'estCompany') {
      newObj = {
        ...newObj,
        estCompany: e
      };
    }
    if (_field === 'addressCompany') {
      newObj = {
        ...newObj,
        addressCompany: e.target.value
      };
    }
    setValueForm(newObj);
  };

  const redirectPage = _url => () => {
    return navigator(_url);
  };

  const handleSubmit = async () => {
    if (isEmpty(type)) {
      await dispatch(createCompanyAction({ ...valueForm, introCompany: editorState }));
    } else {
      await dispatch(editCompanyAction({ ...valueForm, idCompany: idCompany, introCompany: editorState }));
    }
    await navigator(-1);
  };

  return (
    <>
      <div className="wrapper-form">
        <div className="form-group form-group-width">
          <p>Logo c??ng ty</p>
          <div
            {...getRootProps({
              className: `dropzone-company `
            })}
          >
            <input {...getInputProps()} />
            <p>T???i ???nh l??n</p>
          </div>
          {!isEmpty(valueForm.logoCompany) && <img src={valueForm.logoCompany} alt="hinh anh" />}
        </div>
        <div className="form-group form-group-width">
          <p>T??n c??ng ty</p>
          <Input
            name="nameCompany"
            value={valueForm.nameCompany}
            size="large"
            placeholder="T??n c??ng ty"
            allowClear
            onChange={e => onChangeInfoAccount(e, 'nameCompany')}
          />
        </div>
        <div className="form-group form-group-width">
          <p>Website c??ng ty (n???u c??)</p>
          <Input
            name="websiteCompany"
            value={valueForm.websiteCompany}
            size="large"
            placeholder="Website c??ng ty"
            allowClear
            onChange={e => onChangeInfoAccount(e, 'websiteCompany')}
          />
        </div>
        <div className="form-group form-group-width">
          <p>T???ng s??? nh??n vi??n</p>
          <Input
            name="totalEmployee"
            value={valueForm.totalEmployee}
            size="large"
            placeholder="T???ng s??? nh??n vi??n"
            allowClear
            onChange={e => onChangeInfoAccount(e, 'totalEmployee')}
          />
        </div>
        <div className="form-group form-group-width">
          <p>?????a ch???</p>
          <Input
            name="addressCompany"
            value={valueForm.addressCompany}
            size="large"
            placeholder="?????a ch??? c??ng ty"
            allowClear
            onChange={e => onChangeInfoAccount(e, 'addressCompany')}
          />
        </div>
        <div className="form-group form-group-width">
          <p>D???ch v??? c??ng ty</p>
          <Input
            name="serviceCompany"
            value={valueForm.serviceCompany}
            size="large"
            placeholder="D???ch v??? c??ng ty"
            allowClear
            onChange={e => onChangeInfoAccount(e, 'serviceCompany')}
          />
        </div>
        <div className="form-group form-group-width">
          <p>Th???i gian th??nh l???p c??ng ty</p>
          <DatePicker
            size="large"
            onChange={(date, dateString) => onChangeInfoAccount(dateString, 'estCompany')}
            format="YYYY-MM-DD"
          />
        </div>
        <div>
          <p className="form-label">Gi???i thi???u c??ng ty</p>
          <CKeditor
            placeholder="M?? t???"
            allowClear
            onChangeEditor={e => setEditorState(e)}
            valueEditor={editorState || ''}
          />
        </div>
      </div>
      <Space size={[8, 16]} className="form-group-width">
        <Button danger size="large" onClick={redirectPage(-1)}>
          H???y
        </Button>
        <Button type="primary" size="large" onClick={handleSubmit}>
          {type ? 'C???p nh???t' : 'Th??m c??ng ty'}
        </Button>
      </Space>
    </>
  );
}

export default FormCompany;
