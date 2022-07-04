import React from 'react';
import FormPost from './FormPost';

function AddPost() {
  return (
    <div className="wrapper-content-inner-client customize-scroll">
      <div className="content-inner-client-head">
        <p className="content-inner-client-head-title">Tạo bài viết</p>
      </div>
      <div className="content-inner-client-bottom">
        <FormPost />
      </div>
    </div>
  );
}

export default AddPost;
