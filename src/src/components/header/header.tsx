import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaBars, FaShoppingCart } from 'react-icons/fa';

import headerStyle from './header.module.scss';
import logo from '../../logoBoxMain.svg';
import { auth } from '../../firebase/utils';
import CartHeader from '../cart-header/cart-header';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { selectCartProductsCount } from '../../redux/cart/cart-selectors';
import { useCart } from '../../hooks/useCart';
import type { RootState } from '../../types/common';

const Header: React.FC = () => {
  const currentUser = useSelector((state: RootState) => selectCurrentUser(state));
  const cartCount = useSelector((state: RootState) => selectCartProductsCount(state));
  const { isCartHidden, toggleCart } = useCart();

  const [isOpen, setIsOpen] = useState(false);

  const dropMenu = (event: React.MouseEvent) => {
    // Prevent event propagation so external click listener doesn't execute immediately
    event.stopPropagation();
    
    const newState = !isOpen;
    setIsOpen(newState);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      if (isOpen) {
        document.removeEventListener('click', handleClickOutside);
      }
    };
  }, [isOpen]);

  const handleSignOut = () => {
    auth.signOut();
  };

  // Check if mobile screen
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className={headerStyle.header}>
      {/* Desktop: Always show cart icon */}
      {!isMobile && (
        <div className={headerStyle.cartHeader}>
          <CartHeader />
        </div>
      )}
      {/* Mobile: Toggle button only (positioned below header) */}
      {isMobile && (
        <div className={headerStyle.mobileControls}>
          <div 
            className={headerStyle.toggleMenu} 
            onClick={dropMenu}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <FaBars size={28} />
          </div>
          {/* Mobile cart count display */}
          {cartCount > 0 && (
            <div className={headerStyle.mobileCartCount}>
              <span>{cartCount}</span>
            </div>
          )}
        </div>
      )}
      <div className={headerStyle.main}>
        <div className={headerStyle.logo}>
          <Link to="/">
            <img src={logo} alt="logo" width={250} />
          </Link>
        </div>
        <div className={headerStyle.menu}>
          <div className={headerStyle.links}>
            <Link to="/shop/movie" className={headerStyle.link}>
              <span>Movie</span>
            </Link>
            <Link to="/shop/animation" className={headerStyle.link}>
              <span>Animation</span>
            </Link>
            <Link to="/shop/tvseries" className={headerStyle.link}>
              <span>TV<br />Series</span>
            </Link>
            <Link to="/shop/sportsart" className={headerStyle.link}>
              <span>Sports<br />/Art</span>
            </Link>
            <Link to="/shop/rarecollection" className={headerStyle.link}>
              <span>Rare<br />Collection</span>
            </Link>
            <div className={headerStyle.divider}></div>
            {currentUser ? 
              <div 
                onClick={handleSignOut} 
                className={`${headerStyle.link} ${headerStyle.login}`}
                style={{ cursor: 'pointer' }}
              >
                Log out
              </div>
              : 
              <Link 
                to="/login" 
                className={`${headerStyle.link} ${headerStyle.login}`}
              >
                Sign In
              </Link>
            }  
          </div>
        </div>  
        {/* Mobile: Menu + cart dropdown when toggle menu is clicked */}
        {isMobile && (
          <div 
            className={`${headerStyle.menudown} ${isOpen ? headerStyle.open : headerStyle.closed}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={headerStyle.list}>
              <Link to="/shop/movie" className={headerStyle.link}>
                <span>Movie</span>
              </Link>
              <Link to="/shop/animation" className={headerStyle.link}>
                <span>Animation</span>
              </Link>
              <Link to="/shop/tvseries" className={headerStyle.link}>
                <span>TV Series</span>
              </Link>
              <Link to="/shop/sportsart" className={headerStyle.link}>
                <span>Sports & Art</span>
              </Link>
              <Link to="/shop/rarecollection" className={headerStyle.link}>
                <span>Rare Collection</span>
              </Link>
              {currentUser ? 
                <div 
                  onClick={handleSignOut} 
                  className={headerStyle.link}
                  style={{ cursor: 'pointer' }}
                >
                  Log out
                </div>
                : 
                <Link 
                  to="/login" 
                  className={`${headerStyle.link} ${headerStyle.login}`}
                >
                  Log in / Sign Up
                </Link>
              }
              {/* Cart dropdown only on mobile */}
              <CartDropdown />
            </div>
          </div>
        )}
        {/* Desktop: Cart dropdown (shown when cart header is clicked) */}
        {!isMobile && !isCartHidden && (
          <div className={headerStyle.sticky}>
            <CartDropdown />
          </div>
        )}
      </div>  
    </div>
  );
};

export default Header; 