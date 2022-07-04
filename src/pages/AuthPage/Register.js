import React from 'react';
import FormRegister from './FormRegister';

import HeaderClient from 'layouts/Header/HeaderClient';
import Footer from 'layouts/Footer';

function Register() {
  return (
    <>
      <HeaderClient />
      <div className="wrapper-auth">
        <div className="content-auth container">
          <FormRegister />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
