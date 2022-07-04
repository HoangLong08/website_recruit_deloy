import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Sidebar from 'layouts/Sidebar';

function PrivateRoute({ children }) {
  const [checkLogin, setCheckLogin] = useState(true);
  const authSlice = useSelector(state => state.authSlice);

  useEffect(() => {
    if (!isEmpty(authSlice.data)) {
      setCheckLogin(true);
    } else {
      setCheckLogin(false);
    }
  }, [authSlice.data]);

  return checkLogin ? <Sidebar content={children} /> : <Navigate to="/dang-nhap" />;
}

export default PrivateRoute;
