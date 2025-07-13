import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import headerStyle from './header.module.scss';
import logo from '../../logoBoxMain.svg';
import toggleMenu from '../../favicon7.svg';

import { auth } from '../../firebase/utils';
import CartHeader from '../cart-header/cart-header';
import CartDropdown from '../cart-dropdown/cart-dropdown';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import { useCart } from '../../hooks/useCart';
import type { RootState } from '../../types/common';

const Header: React.FC = () => {
  const currentUser = useSelector((state: RootState) => selectCurrentUser(state));
  const { isCartHidden } = useCart();

  // toggleMenu to be appeared screen width less than 820px
  const [isOpen, setIsOpen] = useState(false);

  const dropMenu = () => {
    setIsOpen(!isOpen);
  };

  // clickOutside of the menu, closing the toggle menu
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
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = () => {
    auth.signOut();
  };

  console.log('[Header] currentUser:', currentUser);

  return (
    <div className={headerStyle.header}>
      <div className={headerStyle.main}>
        <div className={headerStyle.logo}>
          <Link to="/">
            <img src={logo} alt="logo" width={250} />
          </Link>
        </div>
        <div className={headerStyle.menu}>
          <div className={headerStyle.links}>
            <div className={headerStyle.link}>
              <Link to="/shop/movie"><p>Movie</p></Link>
            </div>
            <div className={headerStyle.link}>
              <Link to="/shop/animation">Animation</Link>
            </div>
            <div className={headerStyle.link}>
              <Link to="/shop/tvseries">TV<br />Series</Link>
            </div>
            <div className={headerStyle.link}>
              <Link to="/shop/sportsart">Sports<br />/Art</Link>
            </div>
            <div className={headerStyle.link}>
              <Link to="/shop/rarecollection">Rare<br />Collection</Link>
            </div>
            {currentUser ? 
              <div onClick={handleSignOut} className={headerStyle.link}>Log out</div>
              : 
              <div className={`${headerStyle.link} ${headerStyle.login}`}>
                <Link to="/login">Log in<br />/Sign Up</Link>
              </div>
            }  
          </div>
        </div>  
        <div>
          <div className={headerStyle.toggleMenu} onClick={() => dropMenu()}>
            <img className={headerStyle.image} src={toggleMenu} alt="Menu" width={50} />
          </div>
          <div className={`${headerStyle.menudown} ${isOpen ? headerStyle.toggle : headerStyle.close}`}>
            <div className={headerStyle.list}>
              <Link to={`/shop/movie`}>
                <div className={headerStyle.link}><h1>Movie</h1></div>
              </Link>
              <div className={headerStyle.link}>
                <Link to="/shop/animation">Animation</Link>
              </div>
              <div className={headerStyle.link}>
                <Link to="/shop/tvseries">TV<br />Series</Link>
              </div>
              <div className={headerStyle.link}>
                <Link to="/shop/sportsart">Sports<br />/Art</Link>
              </div>
              <div className={headerStyle.link}>
                <Link to="/shop/rarecollection">Rare<br />Collection</Link>
              </div>
              {currentUser ? 
                <div onClick={handleSignOut} className={headerStyle.link}>Log out</div>
                : 
                <div className={`${headerStyle.link} ${headerStyle.login}`}>
                  <Link to="/login">Log in<br />/Sign Up</Link>
                </div>
              }  
            </div>
          </div>

          <div className={headerStyle.cartHeader}>
            <CartHeader />
          </div>
          {!isCartHidden && (
            <div className={headerStyle.sticky}>
              <CartDropdown />
            </div>
          )}
        </div>
      </div>  
    </div>
  );
};

export default Header; 