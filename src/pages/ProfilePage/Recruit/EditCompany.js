import React from 'react';

import FormCompany from './FormCompany';

function EditCompany() {
  return (
    <div className="wrapper-content-inner-client customize-scroll">
      <div className="content-inner-client-head">
        <p className="content-inner-client-head-title">Chỉnh sửa thông tin công ty</p>
      </div>
      <div className="content-inner-client-bottom">
        <FormCompany type="edit" />
      </div>
    </div>
  );
}

export default EditCompany;
