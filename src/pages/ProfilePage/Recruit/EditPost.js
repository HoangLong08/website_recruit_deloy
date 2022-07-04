import React from 'react';
import { useParams } from 'react-router-dom';
import FormPost from './FormPost';

function EditPost() {
  const { idPost } = useParams();
  return (
    <div className="wrapper-content-inner-client customize-scroll">
      <div className="content-inner-client-head">
        <p className="content-inner-client-head-title">Chỉnh sửa bài tuyển dụng</p>
      </div>
      <div className="content-inner-client-bottom">
        <FormPost type="edit" idPost={idPost} />
      </div>
    </div>
  );
}

export default EditPost;
