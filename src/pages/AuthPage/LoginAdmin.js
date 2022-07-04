import React from 'react';
import FormLogin from './FormLogin';

function LoginAdmin() {
  return (
    <div className="wrapper-auth">
      <div className="content-auth container">
        <FormLogin type="admin" />
      </div>
    </div>
  );
}

export default LoginAdmin;
