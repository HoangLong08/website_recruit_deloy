import React from 'react';
import { Row, Col } from 'antd';
import './style.css';
import { IconFacebook, IconYoutube } from 'assets/index';

function Footer() {
  return (
    <div className="wrapper-footer">
      <div className="container">
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={14} md={14} lg={14}>
            <h1 className="footer-logo">LPV Recruit</h1>
            <p>Trụ sở: Tòa nhà Siêu Việt, 23 Trần Cao Vân, Phường Đa Kao, Quận 1, TP Hồ Chí Minh</p>
            <p>Chi nhánh: Tầng 12A, Tòa nhà Center Building, Số 1 Nguyễn Huy Tưởng, Quận Thanh Xuân, Hà Nội.</p>
            <p>
              Giấy phép hoạt động dịch vụ việc làm số: 4938/SLĐTBXH-GP do Sở Lao Động Thương Binh & Xã Hội TP.HCM cấp
            </p>
            <p>Điện thoại: (028) 7108 2424 | (024) 7308 2424</p>
            <p>Email hỗ trợ người tìm việc: ntv@vieclam24h.vn</p>
            <p>Email hỗ trợ nhà tuyển dụng: ntd@vieclam24h.vn</p>
          </Col>
          <Col xs={24} sm={4} md={4} lg={4}>
            <h3 className="footer-title">Về LPV</h3>
            <p>Viêc làm</p>
            <p>Công ty</p>
            <p>Bài viết</p>
            <p>Liên hệ</p>
          </Col>
          <Col xs={24} sm={4} md={4} lg={4}>
            <h3 className="footer-title">Kết nối với chúng tôi</h3>
            <div className="d-flex align-items-center gap-12">
              <IconFacebook />
              <IconYoutube />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Footer;
