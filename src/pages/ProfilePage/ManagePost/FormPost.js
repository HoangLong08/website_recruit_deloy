import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input, Space, Button } from 'antd';
import { useDropzone } from 'react-dropzone';
import candidate from 'store/api/candidate';
import CKeditor from 'components/CKEditor/index';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { createPostAction, editPostAction, getDetailPostAction } from 'store/actions/post';
import { createAlert } from 'store/reducers/notificationSlice';

const { TextArea } = Input;

function FormPost(type) {
  const { idPost } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authSlice = useSelector(state => state.authSlice);
  const detailPost = useSelector(state => state.postSlice.detailPost);
  const [value, setValue] = useState({
    title: '',
    subTitle: '',
    bannerImage:
      'https://images.unsplash.com/photo-1614851099175-e5b30eb6f696?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8YmFubmVyfGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  });
  const [editorState, setEditorState] = useState('');

  useEffect(() => {
    if (!isEmpty(type) && !isEmpty(idPost)) {
      dispatch(
        getDetailPostAction({
          idPost: idPost
        })
      );
    }
  }, [type, dispatch, idPost]);

  useEffect(() => {
    if (!isEmpty(type) && !isEmpty(idPost)) {
      setValue({
        title: detailPost.data?.data?.blog_title,
        subTitle: detailPost.data?.data?.blog_sub_title,
        bannerImage: detailPost.data?.data?.blog_thumbnail
      });
      setEditorState(detailPost.data?.data?.blog_des);
    }
  }, [type, detailPost.data, idPost]);

  const onDrop = useCallback(
    async acceptedFiles => {
      setValue({
        ...value,
        bannerImage: URL.createObjectURL(acceptedFiles[0])
      });
      const res = await candidate.uploadCv(acceptedFiles[0]);
      setValue({
        ...value,
        bannerImage: res.data
      });
    },
    [value]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: false });

  const redirectUrl = _url => () => {
    navigate(_url);
  };

  const handleChangeForm = (e, _field) => {
    let newObj = {
      ...value
    };
    if (_field === 'title') {
      newObj = {
        ...newObj,
        title: e.target.value
      };
    }
    if (_field === 'subTitle') {
      newObj = {
        ...newObj,
        subTitle: e.target.value
      };
    }
    setValue(newObj);
  };

  const handleSubmit = async () => {
    if (isEmpty(type)) {
      const res = await dispatch(
        createPostAction({
          ...value,
          des: editorState,
          userId: authSlice.data?.info?.[0]?.user_id
        })
      );
      if (!isEmpty(res.payload)) {
        await dispatch(
          createAlert({
            message: 'Tạo bài viết thành công',
            type: 'success'
          })
        );
      }
    } else {
      const res = await dispatch(
        editPostAction({
          ...value,
          des: editorState,
          userId: authSlice.data?.info?.[0]?.user_id,
          idPost: idPost
        })
      );
      if (!isEmpty(res.payload)) {
        await dispatch(
          createAlert({
            message: 'Cập nhật bài viết thành công',
            type: 'success'
          })
        );
      }
    }
    await navigate(-1);
  };

  return (
    <div>
      <div className="form-group form-group-width">
        <p>Tiêu đề</p>
        <Input
          size="large"
          placeholder="Tiêu đề"
          allowClear
          onChange={e => handleChangeForm(e, 'title')}
          value={value.title || ''}
        />
      </div>
      <div className="form-group form-group-width">
        <p>Hình ảnh</p>
        <div className="wrapper-upload-avatar">
          <img src={value.bannerImage} alt="hinh anh" />
          <div
            {...getRootProps({
              className: `content-upload-avatar`
            })}
          >
            <input {...getInputProps()} />
            <p className="text-upload-image">Tải ảnh lên</p>
          </div>
        </div>
      </div>
      <div className="form-group form-group-width">
        <p>Mô tả ngắn</p>
        <TextArea
          size="large"
          placeholder="Mô tả ngắn"
          allowClear
          autoSize={{ minRows: 3, maxRows: 5 }}
          onChange={e => handleChangeForm(e, 'subTitle')}
          value={value.subTitle || ''}
        />
      </div>
      <div className="form-group">
        <p>Mô tả</p>
        <CKeditor
          size="large"
          placeholder="Mô tả"
          allowClear
          onChangeEditor={e => setEditorState(e)}
          valueEditor={editorState || ''}
        />
      </div>
      <Space size={[8, 16]} className="form-group-width">
        <Button danger size="large" onClick={redirectUrl(-1)}>
          Hủy
        </Button>
        <Button type="primary" size="large" onClick={handleSubmit}>
          {!isEmpty(type) ? 'Cập nhật bài viết' : 'Tạo bài viết'}
        </Button>
      </Space>
    </div>
  );
}

export default FormPost;
