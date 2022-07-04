import React, { useState, useEffect } from 'react';
import TableComponent from 'components/TableComponent/index';
import { nanoid } from 'nanoid';
import { Button, Space, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { deletePostAction, getAllPostAction } from 'store/actions/post';
import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { useNavigate } from 'react-router-dom';

const columns = [
  {
    title: 'Tiêu đề',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'createdAt',
    key: 'createdAt'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
    width: 100
  }
];

function ManagePost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authSlice = useSelector(state => state.authSlice);
  const listPost = useSelector(state => state.postSlice.listPost);
  const [isModalVisible, setIsModalVisible] = useState('');

  useEffect(() => {
    dispatch(
      getAllPostAction({
        pageIndex: 1,
        pageSize: 999,
        userId: authSlice.data.info?.[0]?.user_id,
        blogTitle: ''
      })
    );
  }, [dispatch, authSlice.data]);

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

  const redirectUrl = _url => () => {
    navigate(_url);
  };

  const handleDelete = _idPost => () => {
    setIsModalVisible(_idPost);
  };

  const handleOk = () => {
    dispatch(
      deletePostAction({
        idPost: parseInt(isModalVisible),
        userId: authSlice.data.info?.[0]?.user_id
      })
    );
    setIsModalVisible('');
  };

  const handleCancel = () => {
    setIsModalVisible('');
  };

  const renderDataSource = () => {
    return listPost.data?.data?.data?.map(item => {
      return {
        key: nanoid(),
        title: item.blog_title,
        createdAt: convertTime(item.user_updated),
        action: (
          <Space size="small">
            <Button type="primary" onClick={redirectUrl('/trang-ca-nhan/bai-viet/' + item.blog_id)}>
              Chỉnh sửa
            </Button>
            <Button danger onClick={handleDelete(item.blog_id)}>
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
        <p className="content-inner-client-head-title">Danh sách bài viết của bạn</p>
        <div className="content-inner-client-head-action">
          <Button type="primary" onClick={redirectUrl('/trang-ca-nhan/bai-viet/tao-bai-viet')}>
            Tạo bài viết
          </Button>
        </div>
      </div>
      <div className="content-inner-client-bottom">
        <TableComponent data={renderDataSource()} tableHead={columns} loading={listPost.load} />
      </div>
      <Modal
        title="Vertically centered modal dialog"
        centered
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Bạn có muốn xóa bài viết này không ?</p>
      </Modal>
    </div>
  );
}

export default ManagePost;
