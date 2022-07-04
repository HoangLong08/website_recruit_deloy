import React from 'react';
import { Button } from 'antd';
import SearchInput from '../Candidate/SearchInput';
import TableComponent from 'components/TableComponent/index';

const dataSource = [
  {
    key: '1',
    name: 'Mike',
    age: 32,
    address: '10 Downing Street'
  },
  {
    key: '2',
    name: 'John',
    age: 42,
    address: '10 Downing Street'
  }
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  }
];

function Accounts() {
  return (
    <div className="wrapper-content-inner-client customize-scroll">
      <div className="content-inner-client-head">
        <p className="content-inner-client-head-title">Danh sách tài khoản</p>
        <div className="content-inner-client-head-action">
          <SearchInput />
          <Button type="primary">Thêm tài khoản</Button>
        </div>
      </div>
      <div className="content-inner-client-bottom">
        <TableComponent data={dataSource} tableHead={columns} />
      </div>
    </div>
  );
}

export default Accounts;
