import React from 'react';
import { Table } from 'antd';

function TableComponent({ data, tableHead, loading }) {
  return (
    <>
      <Table bordered dataSource={data} columns={tableHead} loading={loading} />
    </>
  );
}

export default TableComponent;
