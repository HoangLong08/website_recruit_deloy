import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import './style.css';

function NotFound() {
  const navigate = useNavigate();

  const redirectUrl = _url => () => {
    navigate(_url);
  };

  return (
    <div className="wrapper-page-error">
      <h1>404</h1>
      <p>Không tìm thấy</p>
      <Button content="Quay lại" onclick={redirectUrl(-1)} />
    </div>
  );
}

export default NotFound;
