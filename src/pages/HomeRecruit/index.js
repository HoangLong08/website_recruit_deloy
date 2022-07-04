import React from 'react';
import Footer from 'layouts/Footer/index';
import HeaderClient from 'layouts/Header/HeaderClient';
import './style.css';

function HomeRecruit() {
  return (
    <>
      <HeaderClient />
      <div className="wrapper-home-recruit">
        <div className="content-home-recruit-top">
          <div className="container">
            <section className="content-home-recruit-image">
              <img src="https://www.reed.co.uk/resources/images/controllers/home/homepage-banner-2021.jpg" alt="" />
            </section>
            <h1>Chúng tôi mang đến trải nghiệm dịch vụ tốt nhất</h1>
            <p>
              Tại Việt Nam, LPV là lựa chọn của hơn 17.000 doanh nghiệp hàng đầu với các ưu thế: Tiếp cận hiệu quả nhiều
              nguồn ứng viên tiềm năng với Giải pháp kết nối, tuyển dụng và quản lý nhân tài Talent Solution, Talent
              Driver, Targeted Email Marketing, Talent Referral. Thu hút hàng trăm ngàn hồ sơ ứng viên hoàn chỉnh và
              được cập nhật mới thường xuyên
            </p>
            <section className="content-home-recruit-image">
              <img src="https://www.reed.co.uk/resources/images/controllers/home/homepage-banner-2021.jpg" alt="" />
            </section>
            <h1>Khách hàng của chúng tôi:</h1>
            <p>LPV tự hào đã cung cấp dịch vụ cho hơn 17.000 + doanh nghiệp hàng đầu tại Việt Nam</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HomeRecruit;
