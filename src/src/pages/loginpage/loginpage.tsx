import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import loginpageStyle from './loginpage.module.scss';
import Login from '../../components/login/login';
import SignUp from '../../components/signup/signup';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import type { RootState } from '../../types/common';

const LoginPage: React.FC = () => {
  const currentUser = useSelector((state: RootState) => selectCurrentUser(state));

  useEffect(() => {
    document.title = 'Login / Sign Up - Collectors App';
  }, []);

  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={loginpageStyle.loginpage}>
      <div className={loginpageStyle.sideBySideContainer}>
        <div className={loginpageStyle.leftForm}><Login /></div>
        <div className={loginpageStyle.rightForm}><SignUp /></div>
      </div>
    </div>
  );
};

export default LoginPage; 