import React from 'react';
import { Pagination } from 'antd';

function Paging({ totalPage, pageCurrent, onChange }) {
  return (
    <>
      <Pagination current={pageCurrent} total={totalPage} showSizeChanger={false} onChange={onChange} />
    </>
  );
}

export default Paging;
