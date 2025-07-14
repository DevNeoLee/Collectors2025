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

const CheckoutForm: React.FC<{ amount: number; onPaymentSuccess?: () => void }> = ({ amount, onPaymentSuccess }) => {
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
      const itemsToPurchase = [...cartProducts];
      
      // Use the same approach as the test button
      setSuccess(true);
      setPurchasedItems(itemsToPurchase);
      setLoading(false);
      
      // Notify parent component about payment success
      if (onPaymentSuccess) {
        onPaymentSuccess();
      }
      
      // Clear the cart after successful payment
      dispatch(clearCart());
    }, 1500);
  };

  const formStyle = {
    maxWidth: 800,
    width: '100%',
    margin: '0 auto',
    padding: '3rem',
    borderRadius: '20px',
    backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    color: isDarkMode ? '#e0e0e0' : '#333333',
    boxShadow: isDarkMode ? '0 20px 60px rgba(0, 0, 0, 0.3)' : '0 20px 60px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    border: isDarkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  };

  const buttonStyle = {
    marginTop: '2rem',
    padding: '1rem 3rem',
    backgroundColor: isDarkMode ? '#7c8cff' : '#667eea',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '1.1rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: isDarkMode ? '0 8px 24px rgba(124, 140, 255, 0.3)' : '0 8px 24px rgba(102, 126, 234, 0.3)',
    width: '100%',
    maxWidth: '300px',
  };

  const errorStyle = {
    color: '#e53e3e',
    marginTop: '1rem',
    padding: '1rem 1.5rem',
    backgroundColor: isDarkMode ? 'rgba(229, 62, 62, 0.1)' : 'rgba(229, 62, 62, 0.05)',
    borderRadius: '12px',
    border: `1px solid ${isDarkMode ? 'rgba(229, 62, 62, 0.3)' : 'rgba(229, 62, 62, 0.2)'}`,
    fontSize: '0.9rem',
    textAlign: 'center' as const,
    width: '100%',
  };

  const successStyle = {
    color: '#38a169',
    marginTop: '2rem',
    padding: '3rem 2rem',
    backgroundColor: isDarkMode ? 'rgba(56, 161, 105, 0.1)' : 'rgba(56, 161, 105, 0.05)',
    borderRadius: '20px',
    border: `2px solid ${isDarkMode ? 'rgba(56, 161, 105, 0.3)' : 'rgba(56, 161, 105, 0.2)'}`,
    textAlign: 'center' as const,
    fontSize: '1.2rem',
    fontWeight: '600',
    boxShadow: isDarkMode ? '0 16px 48px rgba(0, 0, 0, 0.2)' : '0 16px 48px rgba(0, 0, 0, 0.08)',
    width: '100%',
    maxWidth: '800px',
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  const productGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
    marginBottom: '2rem',
    width: '100%',
    justifyItems: 'center' as const,
    maxWidth: '600px',
  };

  const productImageStyle = {
    width: '150px',
    height: '150px',
    objectFit: 'cover' as const,
    borderRadius: '12px',
    border: `2px solid ${isDarkMode ? 'rgba(56, 161, 105, 0.3)' : 'rgba(56, 161, 105, 0.2)'}`,
    background: '#fff',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s ease',
  };

  const testInfoStyle = {
    marginTop: '2rem',
    fontSize: '0.9rem',
    color: isDarkMode ? '#a0aec0' : '#64748b',
    padding: '1rem 1.5rem',
    backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.8)' : 'rgba(248, 250, 252, 0.8)',
    borderRadius: '12px',
    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
    textAlign: 'center' as const,
    width: '100%',
  };

  const cardElementStyle = {
    padding: '1rem 1.5rem',
    border: `2px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
    borderRadius: '12px',
    backgroundColor: isDarkMode ? 'rgba(45, 55, 72, 0.8)' : 'rgba(255, 255, 255, 0.8)',
    marginTop: '1rem',
    width: '100%',
    maxWidth: '400px',
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h3 style={{ 
        color: isDarkMode ? '#f0f0f0' : '#333333', 
        marginBottom: '2rem',
        fontSize: '1.8rem',
        fontWeight: '700',
        textAlign: 'center'
      }}>
        💳 Secure Payment
      </h3>
      
      <div style={cardElementStyle}>
        <CardElement options={cardOptions} />
      </div>
      
      <button 
        type="submit" 
        disabled={!stripe || loading} 
        style={{
          ...buttonStyle,
          opacity: (!stripe || loading) ? 0.6 : 1,
          transform: (!stripe || loading) ? 'scale(0.98)' : 'scale(1)',
        }}
        onMouseEnter={(e) => {
          if (!(!stripe || loading)) {
            e.currentTarget.style.transform = 'scale(1.02)';
          }
        }}
        onMouseLeave={(e) => {
          if (!(!stripe || loading)) {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        {loading ? 'Processing...' : `Pay $${amount}`}
      </button>
      
      {/* Demo button for testing without Stripe */}
      <button 
        type="button" 
        onClick={() => {
          setLoading(true);
          setError(null);
          setSuccess(false);
          
          setTimeout(() => {
            // Store purchased items before clearing cart
            const itemsToPurchase = [...cartProducts];
            
            // Set states one by one with delays to ensure they update
            setSuccess(true);
            
            // Notify parent component about payment success
            if (onPaymentSuccess) {
              onPaymentSuccess();
            }
            
            setTimeout(() => {
              setPurchasedItems(itemsToPurchase);
              
              setTimeout(() => {
                setLoading(false);
                
                // Clear cart after setting states
                dispatch(clearCart());
              }, 100);
            }, 100);
          }, 1000);
        }}
        disabled={loading || success}
        style={{
          ...buttonStyle,
          marginTop: '1rem',
          backgroundColor: isDarkMode ? '#4a5568' : '#718096',
          boxShadow: isDarkMode ? '0 8px 24px rgba(74, 85, 104, 0.3)' : '0 8px 24px rgba(113, 128, 150, 0.3)',
          opacity: (loading || success) ? 0.5 : 1,
          transform: (loading || success) ? 'scale(0.98)' : 'scale(1)',
        }}
        onMouseEnter={(e) => {
          if (!(loading || success)) {
            e.currentTarget.style.transform = 'scale(1.02)';
          }
        }}
        onMouseLeave={(e) => {
          if (!(loading || success)) {
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        🧪 Demo Payment (Test)
      </button>
      {error && <div style={errorStyle}>{error}</div>}
      

      
      {success && (
        <div style={successStyle}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎉</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#38a169' }}>
            Payment Successful!
          </div>
          
          {purchasedItems && purchasedItems.length > 0 ? (
            <>
              <div style={{ fontSize: '1.3rem', marginBottom: '2rem', opacity: 0.9, color: '#2d3748' }}>
                Your order has been confirmed and will be shipped soon!
              </div>
              
              <div style={{ 
                fontSize: '1.2rem', 
                marginBottom: '1.5rem', 
                opacity: 0.8,
                fontWeight: '600',
                color: '#4a5568'
              }}>
                📦 Purchased Items ({purchasedItems.length})
              </div>
              
              <div style={productGridStyle}>
                {purchasedItems.map((item, index) => (
                  <div key={index} style={{ 
                    textAlign: 'center',
                    padding: '1rem',
                    borderRadius: '12px',
                    backgroundColor: isDarkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    border: `1px solid ${isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'}`,
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      style={productImageStyle}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div style={{ 
                      fontSize: '1rem', 
                      marginTop: '0.75rem', 
                      opacity: 0.9,
                      fontWeight: '600',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: '#2d3748'
                    }}>
                      {item.name ? (item.name.length > 18 ? item.name.substring(0, 18) + '...' : item.name) : 'Unknown Item'}
                    </div>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      color: '#38a169', 
                      marginTop: '0.5rem',
                      fontWeight: '600'
                    }}>
                      ${item.price} × {item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ fontSize: '1.1rem', marginBottom: '2rem', opacity: 0.8 }}>
              No items found in purchase history.
            </div>
          )}
          
          <div style={{ 
            fontSize: '1.2rem', 
            marginTop: '30px', 
            padding: '2rem',
            backgroundColor: isDarkMode ? 'rgba(56, 161, 105, 0.1)' : 'rgba(56, 161, 105, 0.05)',
            borderRadius: '16px',
            border: `2px solid ${isDarkMode ? 'rgba(56, 161, 105, 0.3)' : 'rgba(56, 161, 105, 0.2)'}`,
            width: '100%',
            maxWidth: '500px'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '1rem', fontSize: '1.3rem', color: '#38a169' }}>📦 Shipping Information:</div>
            <div style={{ fontSize: '1.1rem', opacity: 0.8, lineHeight: '1.6' }}>
              <div style={{ marginBottom: '0.5rem' }}>• Your order will be processed within 24 hours</div>
              <div style={{ marginBottom: '0.5rem' }}>• Estimated delivery: 3-5 business days</div>
              <div style={{ marginBottom: '0.5rem' }}>• You will receive tracking information via email</div>
              <div style={{ marginBottom: '0.5rem' }}>• Free shipping on orders over $50</div>
            </div>
          </div>
          
          <div style={{ 
            fontSize: '1.2rem', 
            marginTop: '2rem', 
            opacity: 0.8,
            fontWeight: '600',
            color: '#38a169'
          }}>
            Thank you for your purchase! 🛍️
          </div>
        </div>
      )}
      <div style={testInfoStyle}>
        <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>🧪 Test Card Information:</div>
        <div style={{ fontFamily: 'monospace', fontSize: '1rem' }}>
          Card: <strong>4242 4242 4242 4242</strong><br/>
          Expiry: <strong>01/25</strong> | CVC: <strong>123</strong>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm; 