import React from 'react';
import googleLogo from '../../logoGoogle.png';
import formButtonStyle from './form-button.module.scss';
import type { FormButtonProps } from '../../types/common';

interface ExtendedFormButtonProps extends Omit<FormButtonProps, 'type'> {
  isGoogle?: boolean;
  isProduct?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const FormButton: React.FC<ExtendedFormButtonProps> = ({ 
  children, 
  isGoogle, 
  isProduct, 
  type = 'button',
  onClick,
  disabled = false,
  ...otherProps 
}) => (
  <button 
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`${formButtonStyle.button} ${isProduct ? formButtonStyle.isProduct : ""} ${isGoogle ? formButtonStyle.isGoogle : ""}`} 
    {...otherProps}
  >
    <div>{children}</div>
    {isGoogle && <img src={googleLogo} alt="google-logo" className={formButtonStyle.googleLogo} />}
  </button>
);

export default FormButton; 