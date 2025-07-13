import React from 'react';
import { useSelector } from 'react-redux';

import checkoutpageStyle from './checkoutpage.module.scss';
import CheckoutProduct from '../../components/checkout-product/checkout-product';
import { selectCartProducts, selectCartTotal } from '../../redux/cart/cart-selectors';
import type { RootState } from '../../types/common';
import CheckoutForm from './CheckoutForm';

const CheckoutPage: React.FC = () => {
  const cartProducts = useSelector((state: RootState) => selectCartProducts(state));
  const cartTotal = useSelector((state: RootState) => selectCartTotal(state));

  return (
    <div className={checkoutpageStyle.checkoutPage}>
      <h1>Checkout</h1>
      <div className={checkoutpageStyle.items}>
        {cartProducts.map((product) => (
          <CheckoutProduct key={product.id} product={product} />
        ))}
      </div>
      <div className={checkoutpageStyle.total}>
        <h2>Total: ${cartTotal}</h2>
      </div>
      <CheckoutForm amount={cartTotal} />
    </div>
  );
};

export default CheckoutPage; 