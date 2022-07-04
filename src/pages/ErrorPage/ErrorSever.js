import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/index';

function ErrorSever() {
  const navigate = useNavigate();

  const redirectUrl = _url => () => {
    navigate(_url);
  };

  return (
    <div className="wrapper-page-error">
      <h1>500 Error server</h1>
      <p>Có cái gì đó sai sai :v</p>
      <Button content="Quay lại" onclick={redirectUrl(-1)} />
    </div>
  );
}

export default ErrorSever;
