import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import checkoutpageStyle from './checkoutpage.module.scss';
import CheckoutProduct from '../../components/checkout-product/checkout-product';
import { selectCartProducts, selectCartTotal } from '../../redux/cart/cart-selectors';
import type { RootState } from '../../types/common';
import CheckoutForm from './CheckoutForm';

const CheckoutPage: React.FC = () => {
  const cartProducts = useSelector((state: RootState) => selectCartProducts(state));
  const cartTotal = useSelector((state: RootState) => selectCartTotal(state));
  const [isPaymentSuccessful, setIsPaymentSuccessful] = React.useState(false);

  useEffect(() => {
    document.title = 'Checkout - Collectors App';
  }, []);

  return (
    <div className={checkoutpageStyle.checkoutPageOuter}>
      <h1 className={checkoutpageStyle.pageTitle}>Checkout</h1>
      <div className={checkoutpageStyle.verticalLayout}>
        <div className={checkoutpageStyle.productListSection}>
          {cartProducts.length === 0 && !isPaymentSuccessful ? (
            <div className={checkoutpageStyle.emptyCartMsg}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>
                Your cart is empty
              </div>
              <div style={{ fontSize: '1rem', opacity: 0.7 }}>
                Add some amazing collector's items to your cart to continue shopping!
              </div>
            </div>
          ) : (
            cartProducts.map((product) => (
              <div className={checkoutpageStyle.productCard} key={product.id}>
                <CheckoutProduct product={product} />
              </div>
            ))
          )}
        </div>
        {(cartProducts.length > 0 || isPaymentSuccessful) && (
          <div className={checkoutpageStyle.checkoutFormFullWidth}>
            {cartProducts.length > 0 && (
              <div className={checkoutpageStyle.totalRow}>
                <span className={checkoutpageStyle.totalLabel}>Total</span>
                <span className={checkoutpageStyle.totalValue}>${cartTotal}</span>
              </div>
            )}
            <CheckoutForm 
              amount={cartTotal} 
              onPaymentSuccess={() => setIsPaymentSuccessful(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage; 