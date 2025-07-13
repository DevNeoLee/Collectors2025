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
    console.log('🔘 Toggle button clicked!');
    console.log('📊 Current isOpen state:', isOpen);
    
    // 이벤트 전파를 막아서 외부 클릭 리스너가 즉시 실행되지 않도록 함
    event.stopPropagation();
    
    const newState = !isOpen;
    console.log('🔄 Setting isOpen to:', newState);
    setIsOpen(newState);
  };

  useEffect(() => {
    console.log('🔄 isOpen state changed to:', isOpen);
    
    const handleClickOutside = (event: MouseEvent) => {
      console.log('🖱️ Click outside detected');
      if (isOpen) {
        console.log('❌ Closing menu due to outside click');
        setIsOpen(false);
      }
    };

    if (isOpen) {
      console.log('📝 Adding click outside listener');
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      if (isOpen) {
        console.log('🧹 Removing click outside listener');
        document.removeEventListener('click', handleClickOutside);
      }
    };
  }, [isOpen]);

  const handleSignOut = () => {
    auth.signOut();
  };

  // 모바일 화면 여부 체크
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 900;
      console.log('📱 Screen width:', window.innerWidth, 'isMobile:', mobile);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  console.log('🎯 Render - isMobile:', isMobile, 'isOpen:', isOpen);
  console.log('🛒 Cart state - isCartHidden:', isCartHidden, 'cartCount:', cartCount);

  return (
    <div className={headerStyle.header}>
      {/* 데스크톱: 카트 아이콘 항상 표시 */}
      {!isMobile && (
        <div className={headerStyle.cartHeader}>
          <CartHeader />
        </div>
      )}
      {/* 모바일: 토글 버튼만 (헤더 바로 아래에 위치) */}
      {isMobile && (
        <div className={headerStyle.mobileControls}>
          <div 
            className={headerStyle.toggleMenu} 
            onClick={dropMenu}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <FaBars size={28} />
          </div>
          {/* 모바일 카트 개수 표시 */}
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
            <div className={headerStyle.divider}></div>
            {currentUser ? 
              <div onClick={handleSignOut} className={headerStyle.link + ' ' + headerStyle.login}>Log out</div>
              : 
              <div className={headerStyle.link + ' ' + headerStyle.login}>
                <Link to="/login">Sign In</Link>
              </div>
            }  
          </div>
        </div>  
        {/* 모바일: 토글 메뉴 클릭 시 메뉴+카트 드롭다운 */}
        {isMobile && (
          <div 
            className={`${headerStyle.menudown} ${isOpen ? headerStyle.open : headerStyle.closed}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={headerStyle.list}>
              <Link to={`/shop/movie`}><div className={headerStyle.link}>Movie</div></Link>
              <div className={headerStyle.link}><Link to="/shop/animation">Animation</Link></div>
              <div className={headerStyle.link}><Link to="/shop/tvseries">TV Series</Link></div>
              <div className={headerStyle.link}><Link to="/shop/sportsart">Sports & Art</Link></div>
              <div className={headerStyle.link}><Link to="/shop/rarecollection">Rare Collection</Link></div>
              {currentUser ? 
                <div onClick={handleSignOut} className={headerStyle.link}>Log out</div>
                : 
                <div className={`${headerStyle.link} ${headerStyle.login}`}>
                  <Link to="/login">Log in / Sign Up</Link>
                </div>
              }
              {/* 모바일에서만 카트 드롭다운 표시 */}
              <CartDropdown />
            </div>
          </div>
        )}
        {/* 데스크톱: 카트 드롭다운 (카트 헤더 클릭 시 표시) */}
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