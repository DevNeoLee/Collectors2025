import React from 'react';
import { Link } from 'react-router-dom';

import Login from '../../components/login/login';
import Signup from '../../components/signup/signup';

import loginpageStyle from './loginpage.module.scss';

const Loginpage: React.FC = () => (
  <div className={loginpageStyle.loginpage}>
    <Login />
    <div className={loginpageStyle.vl}></div>
    <Signup />
  </div>
);

export default Loginpage; 