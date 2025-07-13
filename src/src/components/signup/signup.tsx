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
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
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
      setError(error.message || '회원가입에 실패했습니다.');
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
      <h1>회원가입</h1>
      
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
          label='이름'
          required
        />
        <FormInput
          type='email'
          name='email'
          value={email}
          handleChange={handleChange}
          label='이메일'
          required
        />
        <FormInput
          type='password'
          name='password'
          value={password}
          handleChange={handleChange}
          label='비밀번호'
          required
        />
        <FormInput
          type='password'
          name='confirmPassword'
          value={confirmPassword}
          handleChange={handleChange}
          label='비밀번호 확인'
          required
        />
        <FormButton type='submit' disabled={isLoading}>
          {isLoading ? '가입 중...' : '회원가입'}
        </FormButton>
      </form>
    </div>
  );
};

export default SignUp; 