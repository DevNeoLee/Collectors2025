import React from 'react';
import cartItemHeaderStyle from './cart-item-header.module.scss';
import type { CartItemProps } from '../../types/common';

const CartItemHeader: React.FC<CartItemProps> = ({ 
  item: { imageUrl, price, name, quantity } 
}) => (
  <>
    <div className={cartItemHeaderStyle.container}> 
      <img src={imageUrl} alt={name} className={cartItemHeaderStyle.image} />
      <div className={cartItemHeaderStyle.detail}>
        <p className={cartItemHeaderStyle.name}>
          {name.length > 50 ? `${name.slice(0, 50)}...` : name}
        </p>
        <p className={cartItemHeaderStyle.price}>
          ${price} x {quantity || 0}
        </p>
      </div>
    </div>
    <hr className={cartItemHeaderStyle.hr} />
  </>
);

export default CartItemHeader; 