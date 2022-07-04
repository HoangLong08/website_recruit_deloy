import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import HeaderClient from 'layouts/Header/HeaderClient';
import HeaderAdmin from 'layouts/Header/HeaderAdmin';
import './style.css';

const data = [
  {
    idRole: 1,
    subArr: [
      // {
      //   id: 2,
      //   title: 'Tổng quan',
      //   link: '/trang-ca-nhan/quan-ly-ho-so'
      // },
      {
        id: 3,
        title: 'Việc làm yêu thích',
        link: '/trang-ca-nhan/viec-lam-yeu-thich'
      },
      {
        id: 4,
        title: 'Việc làm đã nộp',
        link: '/trang-ca-nhan/viec-lam-da-nop'
      },
      {
        id: 9,
        title: 'Bài viết của bạn',
        link: '/trang-ca-nhan/bai-viet'
      },
      {
        id: 5,
        title: 'Thông tin cá nhân',
        link: '/trang-ca-nhan/thong-tin-ca-nhan'
      }
    ]
  },
  {
    idRole: 2, // tuyển dụng
    subArr: [
      {
        id: 9,
        title: 'Tổng quan',
        link: '/trang-ca-nhan/tong-quan'
      },
      {
        id: 6,
        title: 'Danh sách đăng tuyển',
        link: '/trang-ca-nhan/danh-sach-bai-dang'
      },
      // {
      //   id: 7,
      //   title: 'Danh sách tài khoản',
      //   link: '/trang-ca-nhan/danh-sach-tai-khoan'
      // },
      {
        id: 8,
        title: 'Danh sách công ty',
        link: '/trang-ca-nhan/danh-sach-cong-ty'
      }
    ]
  },
  {
    idRole: 3,
    subArr: [
      {
        id: 11,
        title: 'Tổng quan',
        link: '/admin/tong-quan'
      },
      {
        id: 13,
        title: 'Danh sách tin tuyển dụng',
        link: '/admin/danh-sach-tin-tuyen-dung'
      },
      {
        id: 12,
        title: 'Danh sách nhà tuyển dụng',
        link: '/admin/danh-sach-tuyen-dung'
      },
      {
        id: 13,
        title: 'Danh sách ứng viên',
        link: '/admin/danh-sach-ung-vien'
      }
    ]
  }
];

function Sidebar({ content }) {
  const location = useLocation();
  const authSlice = useSelector(state => state.authSlice);
  const [dataSidebar, setDataSidebar] = useState([]);
  const pathUrl = location && location.pathname;

  useEffect(() => {
    if (authSlice.data) {
      const findEle = data.filter(item => item.idRole === authSlice.data?.info?.[0]?.user_id_role);
      setDataSidebar(findEle?.[0]?.subArr || []);
    }
  }, [authSlice.data]);

  const checkUrl = (tmpOne, tmpTwo) => {
    if (tmpOne === '/trang-ca-nhan' && authSlice.data?.info?.[0]?.user_id_role === 1) {
      tmpOne = '/trang-ca-nhan/viec-lam-yeu-thich';
    } else if (tmpOne === '/trang-ca-nhan' && authSlice.data?.info?.[0]?.user_id_role === 2) {
      tmpOne = 'tong-quan';
    }
    return tmpOne.includes(tmpTwo.split('/')[2]);
  };

  return (
    <>
      {pathUrl.includes('admin') && <HeaderAdmin />}
      {!pathUrl.includes('admin') && <HeaderClient />}
      <div className="wrapper-sidebar">
        <div className="wrapper-menu">
          <div className="content-menu">
            {dataSidebar.map(item => (
              <NavLink
                key={nanoid()}
                to={item.link}
                className={({ isActive }) =>
                  isActive || checkUrl(pathUrl, item.link)
                    ? 'item-menu-sidebar menu-item-link-active'
                    : 'item-menu-sidebar menu-item-link'
                }
              >
                <div className="item-title">{item.title}</div>
              </NavLink>
            ))}
          </div>
        </div>
        <div className="content-layout">{content}</div>
      </div>
    </>
  );
}

export default Sidebar;
