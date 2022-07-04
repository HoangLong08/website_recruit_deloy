import React from 'react';
import Footer from 'layouts/Footer/index';
import HeaderClient from 'layouts/Header/HeaderClient';
import './style.css';
import FormLogin from './FormLogin';

function Login() {
  return (
    <>
      <HeaderClient />
      <div className="wrapper-auth">
        <div className="content-auth container">
          <FormLogin />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
