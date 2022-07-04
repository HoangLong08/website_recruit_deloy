import React, { useState, useEffect } from 'react';
import TableComponent from 'components/TableComponent/index';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { Space, Button, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCompanyAction, getCompanyByIdUserAction } from 'store/actions/company';

const columns = [
  {
    title: 'Tên công ty',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Địa điểm',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'status',
    key: 'status',
    width: 150
  }
];

function ListCompany() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authSlice = useSelector(state => state.authSlice);
  const companySlice = useSelector(state => state.companySlice.listCompanyByIdUser);

  const [isModalVisible, setIsModalVisible] = useState('');

  const redirectUrl = _url => () => {
    navigate(_url);
  };

  useEffect(() => {
    dispatch(
      getCompanyByIdUserAction({
        idUser: authSlice.data?.info?.[0]?.user_id
      })
    );
  }, [dispatch, authSlice]);

  const showModal = _id => () => {
    setIsModalVisible(_id);
  };

  const handleOk = async () => {
    await dispatch(
      deleteCompanyAction({
        idCompany: isModalVisible
      })
    );
    await dispatch(
      getCompanyByIdUserAction({
        idUser: authSlice.data?.info?.[0]?.user_id
      })
    );
    await setIsModalVisible('');
  };

  const handleCancel = () => {
    setIsModalVisible('');
  };

  const renderDataSource = () => {
    return companySlice.data?.data?.map(item => {
      return {
        key: nanoid(),
        name: item.company_name,
        address: item.company_address,
        status: (
          <Space size="small">
            <Button
              type="primary"
              onClick={redirectUrl('/trang-ca-nhan/danh-sach-cong-ty/chinh-sua-cong-ty/' + item.company_id)}
            >
              Chỉnh sửa
            </Button>
            <Button danger onClick={showModal(item.company_id)}>
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
        <p className="content-inner-client-head-title">Thông tin công ty</p>
        <div className="content-inner-client-head-action">
          <Button type="primary" onClick={redirectUrl('/trang-ca-nhan/danh-sach-cong-ty/tao-cong-ty')}>
            Tạo công ty
          </Button>
        </div>
      </div>
      <div className="content-inner-client-bottom">
        <TableComponent data={renderDataSource()} tableHead={columns} loading={companySlice.load} />
      </div>
      <Modal title="Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn có muốn xóa công ty này không</p>
      </Modal>
    </div>
  );
}

export default ListCompany;
