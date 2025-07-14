import React, { useEffect, useRef } from 'react';

import cartDropdownStyle from './cart-dropdown.module.scss';
import FormButton from '../form-button/form-button';
import CartItemHeader from '../cart-item-header/cart-item-header';
import { useCart } from '../../hooks/useCart';

const CartDropdown: React.FC = () => {
  const { 
    cartProducts, 
    cartTotal, 
    toggleCart, 
    goToCheckout,
    isCartHidden
  } = useCart();

  const cartRef = useRef<HTMLDivElement>(null);

  console.log('🛒 CartDropdown render - products:', cartProducts.length, 'total:', cartTotal, 'hidden:', isCartHidden);

  // Handle click outside to close cart dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        console.log('🖱️ Click outside cart dropdown detected');
        if (!isCartHidden) {
          console.log('❌ Closing cart dropdown due to outside click');
          toggleCart();
        }
      }
    };

    // Only add listener if cart is open
    if (!isCartHidden) {
      console.log('📝 Adding click outside listener for cart dropdown');
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      if (!isCartHidden) {
        console.log('🧹 Removing click outside listener for cart dropdown');
        document.removeEventListener('click', handleClickOutside);
      }
    };
  }, [isCartHidden, toggleCart]);

  const handleClose = () => {
    console.log('❌ Cart close button clicked');
    toggleCart();
  };

  const handleCheckout = () => {
    console.log('💳 Checkout button clicked');
    goToCheckout();
  };

  // Prevent event propagation when clicking inside the cart dropdown
  const handleCartClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div 
      ref={cartRef}
      className={`${cartDropdownStyle.main} cart-dropdown`}
      onClick={handleCartClick}
    >
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