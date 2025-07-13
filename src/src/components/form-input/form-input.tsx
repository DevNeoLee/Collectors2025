import React from 'react';
import formInputStyle from './form-input.module.scss';
import type { FormInputProps } from '../../types/common';

interface ExtendedFormInputProps extends FormInputProps {
  name: string;
  type: string;
  value: string;
  required?: boolean;
  label?: string;
}

const FormInput: React.FC<ExtendedFormInputProps> = ({ 
  handleChange, 
  label, 
  value,
  name,
  type,
  required = false,
  ...otherProps 
}) => (
  <div className={formInputStyle.group}>
    <input 
      className={formInputStyle.input} 
      onChange={handleChange}
      value={value}
      name={name}
      type={type}
      required={required}
      {...otherProps} 
    />
    {label && (
      <label
        className={ 
          value?.length ? 
            `${formInputStyle.shrink} ${formInputStyle.label}` : 
            formInputStyle.label
        }
      >
        {label}
      </label>
    )}
  </div>
);

export default FormInput; 