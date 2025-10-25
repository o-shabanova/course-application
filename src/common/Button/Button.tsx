import React from 'react';
import './Button.css';

interface ButtonProps {
  buttonText: string;
  type: 'button' | 'submit' | 'reset';
  className: string;

}

export const Button: React.FC<ButtonProps> = ({ 
    buttonText, 
    type, 
    className

}) => {
  return (
  <button 
  type={type}
  className={className}
  >
    {buttonText}
    </button>
  );
};

export default Button;
