import React from 'react';
import FormPost from './FormPost';

function AddPost() {
  return (
    <div className="wrapper-content-inner-client customize-scroll">
      <div className="content-inner-client-head">
        <p className="content-inner-client-head-title">Thêm bài tuyển dụng</p>
      </div>
      <div className="content-inner-client-bottom">
        <FormPost />
      </div>
    </div>
  );
}

export default AddPost;
