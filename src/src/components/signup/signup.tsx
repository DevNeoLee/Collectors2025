import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import FormInput from '../form-input/form-input';
import FormButton from '../form-button/form-button';
import { auth, createUserProfileDocument } from '../../firebase/utils';
import signupStyle from './signup.module.scss';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const { displayName, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsLoading(true);

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await createUserProfileDocument(user, { displayName });

      setFormData({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch (error: any) {
      setError(error.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const { displayName, email, password, confirmPassword } = formData;

  return (
    <div className={signupStyle.signup}>
      <h1>Sign Up</h1>
      
      {error && (
        <div className={signupStyle.error}>
          {error}
        </div>
      )}

      <form className='sign-up-form' onSubmit={handleSubmit}>
        <FormInput
          type='text'
          name='displayName'
          value={displayName}
          handleChange={handleChange}
          label='Name'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          label='Password'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={handleChange}
          label='Confirm Password'
          required
        />
        <FormButton type='submit' disabled={isLoading}>
          {isLoading ? 'Signing up...' : 'Sign Up'}
        </FormButton>
      </form>
    </div>
  );
};

export default SignUp; 