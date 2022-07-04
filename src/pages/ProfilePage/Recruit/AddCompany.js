import React from 'react';
import FormCompany from './FormCompany';

function AddCompany() {
  return (
    <div className="wrapper-content-inner-client customize-scroll">
      <div className="content-inner-client-head">
        <p className="content-inner-client-head-title">Thêm thông tin công ty</p>
      </div>
      <div className="content-inner-client-bottom">
        <FormCompany />
      </div>
    </div>
  );
}

export default AddCompany;
