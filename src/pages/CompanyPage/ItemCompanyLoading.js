import React from 'react';
import { Skeleton } from 'antd';

function ItemCompanyLoading() {
  return (
    <div className="item-company">
      <div className="wrapper-item-company-image">
        <Skeleton.Button active size="small" shape="default" block={true} style={{ width: '60px' }} />
      </div>
      <div className="item-company-name">
        <Skeleton.Button active size="small" shape="default" block={true} />
      </div>
      <div className="item-company-establish">
        <Skeleton.Button active size="small" shape="default" block={true} />
      </div>
      <div className="item-company-btn">
        <Skeleton.Button active size="small" shape="default" block={true} style={{ width: '100px' }} />
      </div>
    </div>
  );
}

export default ItemCompanyLoading;
