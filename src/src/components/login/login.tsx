import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

import loginStyle from './login.module.scss';
import FormInput from '../form-input/form-input';
import FormButton from '../form-button/form-button';
import { auth, signInWithGoogle } from '../../firebase/utils';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    const { email, password } = formData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setFormData({ email: '', password: '' });
    } catch (error: any) {
      setError(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    
    try {
      await signInWithGoogle();
    } catch (error: any) {
      setError(error.message || 'Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className={loginStyle.login}>
      <h1>Sign In</h1>

      {error && (
        <div className={loginStyle.error}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <FormInput
          name='email'
          type='email'
          handleChange={handleChange}
          value={formData.email}
          label='Email'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={formData.password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <FormButton type='submit' disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Sign In'}
        </FormButton>
      </form>
      
      <FormButton 
        onClick={handleGoogleSignIn} 
        isGoogle 
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign in with Google'}
      </FormButton>
    </div>
  );
};

export default Login; 