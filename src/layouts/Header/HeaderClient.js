import React, { useEffect, useState, useRef } from 'react';
import { Tabs, Popover } from 'antd';
import { isEmpty } from 'lodash';
import { notification } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import Button from 'components/Button';
import { IconBell } from 'assets/index';
import { checkLogin } from 'store/reducers/authSlice';
import FormLogin from 'pages/AuthPage/FormLogin';
import FormRegister from 'pages/AuthPage/FormRegister';
import socketIOClient from 'socket.io-client';
import axios from 'axios';
import authHeader from 'services/authHeader';
import { nanoid } from 'nanoid';
import { format, formatDistance } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import './style.css';
import './animationBell.css';

const { TabPane } = Tabs;
const host = process.env.REACT_APP_URL_API + ':3999';

const data = [
  {
    id: 1,
    des: 'Việc làm',
    link: '/viec-lam'
  },
  {
    id: 2,
    des: 'Công ty',
    link: '/cong-ty'
  },
  {
    id: 3,
    des: 'Bài viết',
    link: '/bai-viet'
  },
  {
    id: 4,
    des: 'Liên hệ',
    link: '/lien-he'
  }
];

const openNotification = (placement, des, time) => {
  notification.info({
    message: 'Thông báo',
    description: des,
    placement,
    duration: time
  });
};

function HeaderClient() {
  const socketRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authSlice = useSelector(state => state.authSlice);
  const [activePopoverProfile, setActivePopoverProfile] = useState(false);
  const [notify, setNotify] = useState([]);
  const [mess, setMess] = useState('');

  useEffect(() => {
    if (!isEmpty(authSlice.data?.token)) {
      dispatch(
        checkLogin({
          checkLogin: true,
          inc: 0
        })
      );
    }
  }, [authSlice.data, dispatch]);

  useEffect(() => {
    if (!isEmpty(authSlice.data?.token)) {
      const fetchData = async () => { //5000
        const result = await axios.get(process.env.REACT_APP_URL_API + '/api/notify', { headers: authHeader() });
        setNotify(result.data.data);
      };
      fetchData();
    }
  }, [authSlice.data?.token]);

  useEffect(() => {
    if (!isEmpty(authSlice.data?.token)) {
      socketRef.current = socketIOClient.connect(host);
      socketRef.current.emit('profile', {
        user_id: authSlice.data?.info[0]?.user_id,
        role_id: authSlice.data?.info[0]?.user_id_role
      });
    }
  }, [authSlice.data]);

  useEffect(() => {
    if (!isEmpty(authSlice.data?.token)) {
      socketRef.current.on('notify', dataGot => {
        setNotify(state => [dataGot, ...state]);
        setMess(dataGot);
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [authSlice.data?.token]);

  useEffect(() => {
    if (!isEmpty(authSlice.data?.token)) {
      let timer1;
      if (!isEmpty(mess)) {
        timer1 = setTimeout(() => setMess(''), 10000);
      }
      return () => {
        clearTimeout(timer1);
      };
    }
  }, [mess, authSlice.data?.token]);

  const redirectUrl = _url => () => {
    navigate(_url);
  };

  const handleLogout = () => {
    window.location.href = '/';
    localStorage.removeItem('infoUser');
  };

  const closeModalAuth = () => {
    dispatch(
      checkLogin({
        checkLogin: false,
        inc: 0
      })
    );
  };

  const convertTime = _time => {
    if (_time) {
      const date = _time;
      const timeZone = 'Asia/Saigon';
      const zonedDate = utcToZonedTime(date, timeZone);
      const pattern = 'yyyy-MM-dd HH:mm:ss';
      const output = format(zonedDate, pattern, { timeZone: timeZone });
      const res = formatDistance(new Date(), new Date(output), {
        includeSeconds: true
      });
      return res + ' ago';
    }
    return null;
  };

  return (
    <>
      {!isEmpty(mess) > 0 && openNotification('bottomRight', mess.content, 100)}
      <div className="wrapper-header">
        <div className="content-header container">
          <div className="header-left">
            <Link to="/">
              <h1 className="text-logo">LPV Recruithhh</h1>
            </Link>
            <ul className="header-menu">
              {data.map(item => {
                if (authSlice.data?.info?.[0]?.user_id_role === 2 && item.link === '/viec-lam') {
                  return '';
                }
                return (
                  <NavLink
                    to={item.link}
                    key={item.id}
                    className={({ isActive }) => (isActive ? 'item-link-active' : 'item-link')}
                  >
                    {item.des}
                  </NavLink>
                );
              })}
            </ul>
          </div>
          <div className="header-right">
            {!isEmpty(authSlice.data) && (
              <div className="wrapper-form-action">
                <div>
                  <Popover
                    overlayClassName="wrapper-notify"
                    placement="bottomRight"
                    title={<h2>Thông báo</h2>}
                    content={
                      <div>
                        {isEmpty(notify) && <p>Đang rỗng</p>}
                        {!isEmpty(notify) &&
                          notify?.map(item => (
                            <div className="item-notify" key={nanoid()}>
                              <p className="des-notify line-clamp-two">{item.content}</p>
                              <p className="time-notify">{convertTime(item.created_at)}</p>
                            </div>
                          ))}
                      </div>
                    }
                    trigger="click"
                  >
                    <IconBell className={`${!isEmpty(mess) && 'bell'}`} />
                  </Popover>
                </div>
                <div
                  className="wrapper-header-image"
                  onClick={() => setActivePopoverProfile(!activePopoverProfile)}
                  roles="button"
                  aria-hidden="true"
                >
                  <div className="wrapper-header-info">
                    <img src={authSlice.data?.info?.[0]?.user_image} alt="hinh anh" />
                    <div className="wrapper-header-name-and-type">
                      <p className="wrapper-header-info-type">
                        {authSlice.data?.info?.[0]?.user_id_role === 1 ? 'Ứng viên' : 'Nhà tuyển dụng'}
                      </p>
                      <p className="wrapper-header-info-name">{authSlice.data?.info?.[0]?.user_name}</p>
                    </div>
                  </div>
                  <div className={`wrapper-popover-header ${activePopoverProfile && 'wrapper-popover-header-active'}`}>
                    <Link to="/trang-ca-nhan">
                      <p className="popover-header-text">Trang cá nhân</p>
                    </Link>
                    <div className="popover-header-line" />
                    <p className="popover-header-text" roles="button" aria-hidden="true" onClick={handleLogout}>
                      Đăng xuất
                    </p>
                  </div>
                </div>
              </div>
            )}
            {isEmpty(authSlice.data) && (
              <div className="wrapper-form-action">
                <Button className="btn-no-background" content="Đăng nhập" onclick={redirectUrl('/dang-nhap')} />
                <Button content="Đăng ký" onclick={redirectUrl('/dang-ky')} />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        className={`wrapper-login-modal 
          ${!authSlice.isModalAuth.checkLogin && authSlice.isModalAuth.inc > 0
            ? 'login-modal-active'
            : 'login-modal-no-active'
          }`}
      >
        <div onClick={closeModalAuth} roles="button" aria-hidden="true" className="content-login-modal-left" />
        <div
          className={`content-login-modal ${!authSlice.isModalAuth.checkLogin && authSlice.isModalAuth.inc > 0 ? 'right-open' : 'right-close'
            }`}
        >
          <div onClick={closeModalAuth} roles="button" aria-hidden="true" className="modal-auth-close">
            X
          </div>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Đăng nhập" key="1">
              <FormLogin />
            </TabPane>
            <TabPane tab="Đăng ký" key="2">
              <div className="wrapper-register-modal">
                <FormRegister />
              </div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </>
  );
}

export default HeaderClient;
