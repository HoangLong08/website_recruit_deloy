import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Popover, Button } from 'antd';
import './style.css';

function HeaderAdmin() {
  const authSlice = useSelector(state => state.authSlice);
  const handleLogout = () => {
    window.location.href = '/';
    localStorage.removeItem('infoUser');
  };
  return (
    <div className="wrapper-header">
      <div className="content-header-admin">
        <div className="header-left">
          <Link to="/">
            <h1 className="text-logo">LPV Recruit</h1>
          </Link>
        </div>
        <div className="header-right">
          <div className="wrapper-header-info">
            <Popover
              placement="bottomRight"
              content={<Button onClick={handleLogout}>Đăng xuất</Button>}
              trigger="click"
            >
              <div className="wrapper-header-info">
                <img src={authSlice.data?.info?.[0]?.user_image} alt="hinh anh" />
                <div className="wrapper-header-name-and-type">
                  <p className="wrapper-header-info-name">{authSlice.data?.info?.[0]?.user_name}</p>
                </div>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderAdmin;
