import React from 'react';
import { Link } from 'react-router-dom';

import footerStyle from './footer.module.scss';
import logo from '../../logoBox.svg';
import blueplane from '../../blueplane_icon.svg';
import gitLogo from '../../git_icon.png';
import linkedinLogo from '../../linkedin-logo.png';

const Footer: React.FC = () => {
  return (
    <div className={footerStyle.container}>
      <div className={footerStyle.logoContainer}>   
        <div className={footerStyle.logo}>
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
          <small>&copy; 2021</small>
        </div>
      </div>
      <div className={footerStyle.listContainer}>
        <div className={footerStyle.list}>
          <h4>Features</h4>
          <ul>
            <li>
              <Link to="/checkout" target="_blank">Shopping Cart</Link> with Redux
            </li>
            <li>
              <div>Payment with <a href="https://www.stripe.com" target="_blank" rel="noopener noreferrer">Stripe</a></div>
            </li>
            <li>
              <Link to="/checkout" target="_blank">Checkout Page</Link>
            </li>
            <li>
              <div>Backend with <a href="https://www.firebase.com" target="_blank" rel="noopener noreferrer">Firebase</a></div>
            </li>
            <li>
              <Link to="/login" target="_blank">Sign Up/Log In Page</Link>
            </li>
          </ul>
        </div>
        <div className={footerStyle.list}>
          <h4>Resources</h4>
          <ul>
            <li>
              <div>Icons by <a href="https://www.freepik.com" target="_blank" rel="noopener noreferrer" title="Freepik">Freepik</a></div>
            </li>
            <li>
              <div>Favicon/Icons by <a href="https://thenounproject.com/" target="_blank" rel="noopener noreferrer" title="Freepik">Noun Project</a></div>
            </li>
            <li></li>
          </ul>
        </div>
        <div className={footerStyle.list}>
          <h4>About</h4>
          <ul className={footerStyle.about}>
            <li>
              <a href="https://devneolee.github.io/justinklee/" target="_blank" rel="noopener noreferrer">
                <span>© Justin K Lee </span>
                <img src={blueplane} alt="" />
              </a>
            </li>
            <li>
              <a target="_blank" rel="noopener noreferrer" href="https://github.com/DevNeoLee/redux-ecommerce-store">
                <span>GitHub</span>
                <img src={gitLogo} alt="" />
              </a>
            </li>      								       
            <li>
              <a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/in/justinklee215/">
                <span>LinkedIn</span>
                <img src={linkedinLogo} alt="" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer; 