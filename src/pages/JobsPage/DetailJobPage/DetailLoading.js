import React from 'react';
import { Skeleton, Row, Col, Tabs } from 'antd';
const { TabPane } = Tabs;

function DetailLoading() {
  return (
    <>
      <div className="wrapper-detail-job">
        <div className="container">
          <div className="detail-job-header">
            <div className="detail-job-header-info">
              <Skeleton.Image active={false} size="large" shape="default" className="detail-job-header-info-image" />
              <div>
                <div className="detail-job-header-info-title">
                  <Skeleton.Avatar active={false} size="large" shape="default" />
                </div>
                <div className="detail-job-header-info-company-name">
                  <Skeleton.Avatar active={false} size="large" shape="default" />
                </div>
                <div className="detail-job-header-info-salary">
                  <Skeleton.Avatar active={false} size="large" shape="default" />
                </div>
              </div>
            </div>
            <div className="detail-job-apply">
              <div className="wrapper-btn-apply">
                <Skeleton.Avatar active={false} size="large" shape="default" />
              </div>
              <div>
                <Skeleton.Avatar active={false} size="large" shape="default" />
              </div>
            </div>
          </div>
          <div className="detail-job-main">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={16} md={16} lg={16}>
                <div className="detail-job-big-des box-white">
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Thông tin tuyển dụng" key="1">
                      <>
                        <div className="detail-job-bottom-info">
                          <Row gutter={[4, 4]}>
                            <Col xs={24} sm={12} md={12} lg={12}>
                              <div className="detail-info-label">
                                <Skeleton.Avatar active={false} size="large" shape="default" />
                              </div>
                              <div className="detail-info-label">
                                <Skeleton.Avatar active={false} size="large" shape="default" />
                              </div>
                              <div className="detail-info-label">
                                <Skeleton.Avatar active={false} size="large" shadive="default" />
                              </div>
                            </Col>
                            <Col xs={24} sm={12} md={12} lg={12}>
                              <div className="detail-info-label">
                                <Skeleton.Avatar active={false} size="large" shape="default" />
                              </div>
                              <div className="detail-info-label">
                                <Skeleton.Avatar active={false} size="large" shape="default" />
                              </div>
                              <div className="detail-info-label">
                                <Skeleton.Avatar active={false} size="large" shape="default" />
                              </div>
                            </Col>
                          </Row>
                        </div>
                        <div>
                          <Skeleton paragraph={{ rows: 8 }} />
                        </div>
                      </>
                    </TabPane>
                    <TabPane tab="Thông tin công ty" key="3">
                      <div>
                        <Skeleton paragraph={{ rows: 4 }} />
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              </Col>
              <Col xs={24} sm={8} md={8} lg={8}>
                <div className="detail-job-sam-job box-white">
                  <Skeleton paragraph={{ rows: 4 }} />
                </div>
                <div className="detail-job-big-des box-white">
                  <Skeleton paragraph={{ rows: 4 }} />
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailLoading;
