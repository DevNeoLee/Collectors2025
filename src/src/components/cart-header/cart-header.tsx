import React from 'react';
import { useSelector } from 'react-redux';

import cartHeaderStyle from './cart-header.module.scss';
import { selectCartProductsCount } from '../../redux/cart/cart-selectors';
import { useCart } from '../../hooks/useCart';
import type { RootState } from '../../types/common';

const CartHeader: React.FC = () => {
  const cartCount = useSelector((state: RootState) => selectCartProductsCount(state));
  const { toggleCart } = useCart();

  console.log('🛒 CartHeader render - count:', cartCount);

  const handleClick = () => {
    console.log('🛒 CartHeader clicked - toggling cart');
    toggleCart();
  };

  return (
    <div className={cartHeaderStyle.container} onClick={handleClick}>
      <div className={cartHeaderStyle.cart}>
        <div className={cartHeaderStyle.image}>
          <span>🛒</span>
        </div>
      </div>
      <div className={cartHeaderStyle.countContainer}>
        <div className={cartHeaderStyle.number}>
          {cartCount}
        </div>
      </div>
    </div>
  );
};

export default CartHeader; 