import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa';

import footerStyle from './footer.module.scss';
import logo from '../../logoBox.svg';
import blueplane from '../../Vectorfinalplane.svg';

const Footer: React.FC = () => {
  const currentYear = 2025;

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

        {/* Bottom Bar - copyright + signature side by side */}
        <div className={footerStyle.bottomBar}>
          <div className={footerStyle.copyrightRow}>
            <span className={footerStyle.copyrightText}>© {currentYear}</span>
            <a
              href="https://devneolee.github.io/justinklee/"
              target="_blank"
              rel="noopener noreferrer"
              className={footerStyle.homepage}
              aria-label="Justin K Lee Homepage"
            >
              <span>Justin K Lee</span>
              <img src={blueplane} alt="plane icon" className={footerStyle.planeIcon} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 