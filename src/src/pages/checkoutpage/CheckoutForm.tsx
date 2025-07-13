import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Detect dark mode
  const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const cardOptions = isDarkMode ? CARD_ELEMENT_OPTIONS_DARK : CARD_ELEMENT_OPTIONS;

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
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  const formStyle = {
    maxWidth: 400,
    margin: '2rem auto',
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: isDarkMode ? '#3a3a3a' : '#ffffff',
    color: isDarkMode ? '#e0e0e0' : '#333333',
    boxShadow: isDarkMode ? '0 4px 6px rgba(0, 0, 0, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
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
    marginTop: 10,
    padding: '10px',
    backgroundColor: isDarkMode ? '#2a4a2a' : '#e8f5e8',
    borderRadius: '4px',
    border: `1px solid ${isDarkMode ? '#4d6d4d' : '#c8e6c9'}`,
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
      {error && <div style={errorStyle}>{error}</div>}
      {success && <div style={successStyle}>Payment Successful! (Demo)</div>}
      <div style={testInfoStyle}>
        Test Card: 4242 4242 4242 4242 / 01 25 / 123
      </div>
    </form>
  );
};

export default CheckoutForm; 