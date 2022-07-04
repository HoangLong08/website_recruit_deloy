import React from 'react';
import { Input } from 'antd';
import { IconSearch } from 'assets';

function SearchInput({ onChange }) {
  return <Input placeholder="Tìm kiếm" prefix={<IconSearch />} onChange={onChange} />;
}

export default SearchInput;
