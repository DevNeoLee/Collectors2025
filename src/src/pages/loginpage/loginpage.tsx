import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import loginpageStyle from './loginpage.module.scss';
import Login from '../../components/login/login';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import type { RootState } from '../../types/common';

const LoginPage: React.FC = () => {
  const currentUser = useSelector((state: RootState) => selectCurrentUser(state));

  useEffect(() => {
    document.title = 'Login - Collectors App';
  }, []);

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={loginpageStyle.loginPage}>
      <Login />
    </div>
  );
};

export default LoginPage; 