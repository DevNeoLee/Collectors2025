import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';

import footerStyle from './footer.module.scss';
import logo from '../../logoBox.svg';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={footerStyle.footer}>
      <div className={footerStyle.container}>
        {/* Main Footer Content */}
        <div className={footerStyle.mainContent}>
          {/* Brand Section */}
          <div className={footerStyle.brandSection}>
            <div className={footerStyle.logo}>
              <Link to="/">
                <img src={logo} alt="Collectors App Logo" />
              </Link>
            </div>
            <p className={footerStyle.tagline}>
              Premium Movie & Media Collections for True Collectors
            </p>
            <div className={footerStyle.socialLinks}>
              <a 
                href="https://github.com/DevNeoLee/redux-ecommerce-store" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a 
                href="https://www.linkedin.com/in/justinklee215/" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a 
                href="mailto:contact@collectorsapp.com" 
                aria-label="Email"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={footerStyle.linksSection}>
            <div className={footerStyle.linkGroup}>
              <h4>Shop</h4>
              <ul>
                <li><Link to="/shop/movie">Movies</Link></li>
                <li><Link to="/shop/animation">Animation</Link></li>
                <li><Link to="/shop/tvseries">TV Series</Link></li>
                <li><Link to="/shop/rarecollection">Rare Collections</Link></li>
              </ul>
            </div>

            <div className={footerStyle.linkGroup}>
              <h4>Account</h4>
              <ul>
                <li><Link to="/login">Sign In</Link></li>
                <li><Link to="/checkout">Checkout</Link></li>
                <li><Link to="/">My Account</Link></li>
                <li><Link to="/">Order History</Link></li>
              </ul>
            </div>

            <div className={footerStyle.linkGroup}>
              <h4>Support</h4>
              <ul>
                <li><Link to="/">Help Center</Link></li>
                <li><Link to="/">Contact Us</Link></li>
                <li><Link to="/">Shipping Info</Link></li>
                <li><Link to="/">Returns</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={footerStyle.bottomBar}>
          <div className={footerStyle.bottomContent}>
            <p className={footerStyle.copyright}>
              © {currentYear} Collectors App. All rights reserved.
            </p>
            <div className={footerStyle.legalLinks}>
              <Link to="/">Privacy Policy</Link>
              <Link to="/">Terms of Service</Link>
              <Link to="/">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 