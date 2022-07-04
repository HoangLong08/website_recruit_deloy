import React from 'react';
import FormPost from './FormPost';

function EditPost() {
  return (
    <div className="wrapper-content-inner-client customize-scroll">
      <div className="content-inner-client-head">
        <p className="content-inner-client-head-title">Chỉnh sửa bài viết</p>
      </div>
      <div className="content-inner-client-bottom">
        <FormPost type="edit" />
      </div>
    </div>
  );
}

export default EditPost;
