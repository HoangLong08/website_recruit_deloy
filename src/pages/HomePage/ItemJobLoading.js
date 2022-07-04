import React from 'react';
import { Skeleton } from 'antd';
import { IconHeart } from 'assets/index';
import './style.css';

function ItemJobLoading() {
  return (
    <div className="wrapper-home-item-job">
      <div className="home-item-job-left">
        <Skeleton.Avatar active={false} size="large" shape="default" />
        <div className="home-item-job-des">
          <div className="home-item-name-job line-clamp-one">
            <Skeleton.Avatar active={false} size="small" shape="default" />
          </div>
          <div className="home-item-name-company line-clamp-one">
            <Skeleton.Avatar active={false} size="small" shape="default" />
          </div>
        </div>
        <IconHeart />
      </div>
      <div className="home-item-list-info">
        <div className="home-item-info">
          <Skeleton.Avatar active={false} size="small" shape="default" />
        </div>
        <div className="home-item-info">
          <Skeleton.Avatar active={false} size="small" shape="default" />
        </div>
      </div>
    </div>
  );
}

export default ItemJobLoading;
