import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../../redux/cart/cart-slice';
import { selectCartProducts } from '../../redux/cart/cart-selectors';
import type { RootState, CartItem } from '../../types/common';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': { color: '#aab7c4' },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
};

// Dark mode card element options
const CARD_ELEMENT_OPTIONS_DARK = {
  style: {
    base: {
      color: '#e0e0e0',
      fontFamily: 'Arial, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': { color: '#888888' },
      backgroundColor: '#4a4a4a',
    },
    invalid: {
      color: '#ff6b6b',
      iconColor: '#ff6b6b',
    },
  },
};

const CheckoutForm: React.FC<{ amount: number }> = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state: RootState) => selectCartProducts(state));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState<CartItem[]>([]);

  // Detect dark mode
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const cardOptions = isDarkMode ? CARD_ELEMENT_OPTIONS_DARK : CARD_ELEMENT_OPTIONS;

  // Note: Removed redirect functionality as requested

  // Debug: Log cart state changes
  useEffect(() => {
    console.log('Cart products count:', cartProducts.length);
  }, [cartProducts]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    if (!stripe || !elements) {
      setError('Stripe has not loaded.');
      setLoading(false);
      return;
    }

    // In a real service, you would create a PaymentIntent on the server and receive a clientSecret.
    // This is for demo purposes only.
    setTimeout(() => {
      // Store purchased items before clearing cart
      setPurchasedItems([...cartProducts]);
      setSuccess(true);
      setLoading(false);
      // Clear the cart after successful payment
      dispatch(clearCart());
      console.log('Cart cleared after successful payment');
    }, 1500);
  };

  const formStyle = {
    maxWidth: 1600,
    width: '100%',
    margin: '2rem auto',
    padding: '80px',
    borderRadius: '24px',
    backgroundColor: isDarkMode ? '#3a3a3a' : '#ffffff',
    color: isDarkMode ? '#e0e0e0' : '#333333',
    boxShadow: isDarkMode ? '0 8px 32px rgba(0, 0, 0, 0.3)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  const buttonStyle = {
    marginTop: 20,
    padding: '10px 20px',
    backgroundColor: isDarkMode ? '#7c8cff' : '#646cff',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  };

  const errorStyle = {
    color: '#ff6b6b',
    marginTop: 10,
    padding: '10px',
    backgroundColor: isDarkMode ? '#4a2a2a' : '#ffebee',
    borderRadius: '4px',
    border: `1px solid ${isDarkMode ? '#6d3f3f' : '#ffcdd2'}`,
  };

  const successStyle = {
    color: '#4caf50',
    marginTop: 40,
    padding: '80px',
    backgroundColor: isDarkMode ? '#2a4a2a' : '#e8f5e8',
    borderRadius: '32px',
    border: `4px solid ${isDarkMode ? '#4d6d4d' : '#c8e6c9'}`,
    textAlign: 'center' as const,
    fontSize: '1.1rem',
    fontWeight: 'bold',
    boxShadow: isDarkMode ? '0 16px 48px rgba(0, 0, 0, 0.3)' : '0 16px 48px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 1400,
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  const productGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '40px',
    marginTop: '60px',
    marginBottom: '60px',
    width: '100%',
    justifyItems: 'center' as const,
  };

  const productImageStyle = {
    width: '220px',
    height: '220px',
    objectFit: 'cover' as const,
    borderRadius: '20px',
    border: `4px solid ${isDarkMode ? '#4d6d4d' : '#c8e6c9'}`,
    background: '#fff',
  };

  const testInfoStyle = {
    marginTop: 20,
    fontSize: 13,
    color: isDarkMode ? '#b0b0b0' : '#888',
    padding: '10px',
    backgroundColor: isDarkMode ? '#4a4a4a' : '#f5f5f5',
    borderRadius: '4px',
    border: `1px solid ${isDarkMode ? '#5a5a5a' : '#e0e0e0'}`,
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={{ color: isDarkMode ? '#f0f0f0' : '#333333', marginBottom: '1rem' }}>
        Card Payment
      </h3>
      <CardElement options={cardOptions} />
      <button 
        type="submit" 
        disabled={!stripe || loading} 
        style={buttonStyle}
      >
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
      
      {/* Demo button for testing without Stripe */}
      <button 
        type="button" 
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            // Store purchased items before clearing cart
            setPurchasedItems([...cartProducts]);
            setSuccess(true);
            setLoading(false);
            dispatch(clearCart());
            console.log('Demo payment successful - cart cleared');
          }, 1000);
        }}
        disabled={loading || success}
        style={{
          ...buttonStyle,
          marginTop: '10px',
          backgroundColor: isDarkMode ? '#666' : '#999',
        }}
      >
        Demo Payment (Test)
      </button>
      {error && <div style={errorStyle}>{error}</div>}
      {success && (
        <div style={successStyle}>
          <div style={{ fontSize: '2.5rem', marginBottom: '30px' }}>🎉</div>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Payment Successful!
          </div>
          
          {purchasedItems.length > 0 && (
            <>
              <div style={{ fontSize: '1.2rem', marginBottom: '30px', opacity: 0.9 }}>
                Your order has been confirmed and will be shipped soon!
              </div>
              
              <div style={{ fontSize: '1.1rem', marginBottom: '30px', opacity: 0.8 }}>
                Purchased Items ({purchasedItems.length}):
              </div>
              
              <div style={productGridStyle}>
                {purchasedItems.map((item, index) => (
                  <div key={index} style={{ textAlign: 'center' }}>
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      style={productImageStyle}
                    />
                    <div style={{ 
                      fontSize: '1.1rem', 
                      marginTop: '10px', 
                      opacity: 0.8,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.name.length > 20 ? item.name.substring(0, 20) + '...' : item.name}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
          
          <div style={{ 
            fontSize: '1.2rem', 
            marginTop: '30px', 
            padding: '20px',
            backgroundColor: isDarkMode ? '#1a3a1a' : '#d4edda',
            borderRadius: '12px',
            border: `2px solid ${isDarkMode ? '#2d5a2d' : '#c3e6cb'}`
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '1.3rem' }}>📦 Shipping Information:</div>
            <div style={{ fontSize: '1.1rem', opacity: 0.8 }}>
              • Your order will be processed within 24 hours<br/>
              • Estimated delivery: 3-5 business days<br/>
              • You will receive tracking information via email
            </div>
          </div>
          
          <div style={{ fontSize: '1.1rem', marginTop: '30px', opacity: 0.7 }}>
            Thank you for your purchase! 🛍️
          </div>
        </div>
      )}
      <div style={testInfoStyle}>
        Test Card: 4242 4242 4242 4242 / 01 25 / 123
      </div>
    </form>
  );
};

export default CheckoutForm; 