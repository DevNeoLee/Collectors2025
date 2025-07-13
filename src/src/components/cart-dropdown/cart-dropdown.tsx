import React from 'react';

import cartDropdownStyle from './cart-dropdown.module.scss';
import FormButton from '../form-button/form-button';
import CartItemHeader from '../cart-item-header/cart-item-header';
import { useCart } from '../../hooks/useCart';

const CartDropdown: React.FC = () => {
  const { 
    cartProducts, 
    cartTotal, 
    toggleCart, 
    goToCheckout 
  } = useCart();

  console.log('🛒 CartDropdown render - products:', cartProducts.length, 'total:', cartTotal);

  const handleClose = () => {
    console.log('❌ Cart close button clicked');
    toggleCart();
  };

  const handleCheckout = () => {
    console.log('💳 Checkout button clicked');
    goToCheckout();
  };

  return (
    <div className={`${cartDropdownStyle.main} cart-dropdown`}>
      <div className={cartDropdownStyle.header}>
        <h3>Shopping Cart</h3>
        <button 
          className={cartDropdownStyle.close} 
          onClick={handleClose}
          aria-label="Close cart"
        >
          ×
        </button>
      </div>
      <hr /> 
      <div className={cartDropdownStyle.body}>
        {cartProducts.length > 0 ? (
          <>
            {cartProducts.map(product => 
              <CartItemHeader key={product.id} item={product} />
            )}
            <div className={cartDropdownStyle.total}>
              <span>Total: ${cartTotal}</span>
            </div>
          </>
        ) : (
          <div className={cartDropdownStyle.empty}>Your cart is empty</div>
        )}
      </div>  
      <div className={cartDropdownStyle.button}>
        <FormButton 
          onClick={handleCheckout}
          disabled={cartProducts.length === 0}
        >
          {cartProducts.length > 0 ? 'Checkout' : 'Cart Empty'}
        </FormButton>
      </div>
    </div>
  );
};

export default CartDropdown; 