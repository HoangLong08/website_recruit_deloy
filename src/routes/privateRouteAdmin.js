import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Sidebar from 'layouts/Sidebar';

function PrivateRouteAdmin({ children }) {
  const [checkLogin, setCheckLogin] = useState(true);
  const authSlice = useSelector(state => state.authSlice);
  useEffect(() => {
    if (!isEmpty(authSlice.infoAdmin)) {
      setCheckLogin(true);
    } else {
      setCheckLogin(false);
    }
  }, [authSlice.infoAdmin]);

  return checkLogin ? <Sidebar content={children} /> : <Navigate to="/admin/dang-nhap" />;
}

export default PrivateRouteAdmin;
