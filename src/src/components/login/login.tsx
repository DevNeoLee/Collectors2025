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
      setError(error.message || '로그인에 실패했습니다.');
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
      setError(error.message || 'Google 로그인에 실패했습니다.');
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
      <h1>로그인</h1>

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
          label='이메일'
          required
        />
        <FormInput
          name='password'
          type='password'
          value={formData.password}
          handleChange={handleChange}
          label='비밀번호'
          required
        />
        <FormButton type='submit' disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </FormButton>
      </form>
      
      <FormButton 
        onClick={handleGoogleSignIn} 
        isGoogle 
        disabled={isLoading}
      >
        {isLoading ? '로그인 중...' : 'Google로 로그인'}
      </FormButton>
    </div>
  );
};

export default Login; 