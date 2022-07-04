import React, { useEffect, useState } from 'react';
import TableComponent from 'components/TableComponent/index';
import { useDispatch, useSelector } from 'react-redux';
import { getListCandidateAction, blockOrUnblockAction } from 'store/actions/admin';
import { nanoid } from 'nanoid';
import { Button, Tag, Modal } from 'antd';
import { isEmpty } from 'lodash';

const columns = [
  {
    title: 'Tên',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Giới tính',
    dataIndex: 'gender',
    key: 'gender'
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
    title: 'Status',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action'
  }
];

function ManageListCandidate() {
  const dispatch = useDispatch();
  const listCandidate = useSelector(state => state.adminSlice.listCandidate);

  const [isModalVisible, setIsModalVisible] = useState('');

  useEffect(() => {
    dispatch(getListCandidateAction());
  }, [dispatch]);

  const handleBlockOrUnlockAccount = (_id, is_block, role_id) => () => {
    setIsModalVisible(_id + '-' + is_block + '-' + role_id);
  };

  const handleOk = () => {
    dispatch(
      blockOrUnblockAction({
        idUser: isModalVisible.split('-')[0],
        idRole: isModalVisible.split('-')[2]
      })
    );
    setIsModalVisible('');
  };

  const handleCancel = () => {
    setIsModalVisible('');
  };

  const renderDataSource = () => {
    return listCandidate.data?.map(item => {
      return {
        key: nanoid(),
        name: item.user_name,
        gender: item.user_gender,
        email: item.user_email,
        phone: item.user_phone,
        status: (
          <Tag color={item.is_block === 0 ? 'geekblue' : 'red'}>{item.is_block === 0 ? 'đang mở' : 'đã khóa'}</Tag>
        ),
        action: (
          <Button type="primary" onClick={handleBlockOrUnlockAccount(item.user_id, item.is_block, item.role_id)}>
            {item.is_block === 0 ? 'Khóa' : 'Mở Khóa'}
          </Button>
        )
      };
    });
  };

  return (
    <div className="wrapper-content-inner-client customize-scroll">
      <div className="content-inner-client-head">
        <p className="content-inner-client-head-title">Danh sách ứng viên</p>
      </div>
      <div className="content-inner-client-bottom">
        <TableComponent data={renderDataSource()} tableHead={columns} loading={listCandidate.load} />
      </div>

      <Modal
        title="Modal"
        visible={isEmpty(isModalVisible) === true ? false : true}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        Bạn có muốn {isModalVisible.split('-')[1] === '1' ? 'mở khóa' : 'khóa'} tài khoản này không ?
      </Modal>
    </div>
  );
}

export default ManageListCandidate;
