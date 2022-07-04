import React from 'react';
import { Skeleton } from 'antd';
import { IconDollar, IconMap } from 'assets/index';

function ItemJobLoading() {
  return (
    <div className="wrapper-jobs-item-job">
      <div className="wrapper-jobs-item-job-left">
        <div className="item-name-job">
          <Skeleton.Avatar active={false} size={200} shape="default" />
        </div>
        <div className="item-company-job">
          <Skeleton.Avatar active={false} size={300} shape="default" />
        </div>
        <div className="wrapper-job-item-job-info">
          <div className="job-item-job-info-child">
            <IconDollar />
            <Skeleton.Avatar active={false} size={60} shape="default" />
          </div>
          <div className="job-item-job-info-child">
            <IconMap />
            <Skeleton.Avatar active={false} size={60} shape="default" />
          </div>
        </div>
        <div className="item-job-deadline">
          <Skeleton.Avatar active={false} size={180} shape="default" />
        </div>
      </div>
      <div className="wrapper-jobs-item-job-right">
        <Skeleton.Avatar active={false} size={63} shape="default" />
      </div>
    </div>
  );
}

export default ItemJobLoading;
