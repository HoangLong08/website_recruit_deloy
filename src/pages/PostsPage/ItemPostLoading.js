import React from 'react';
import { Skeleton } from 'antd';

function ItemPostLoading() {
  return (
    <div className="wrapper-item-post">
      <Skeleton active />
    </div>
  );
}

export default ItemPostLoading;
