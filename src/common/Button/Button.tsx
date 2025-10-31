import React from 'react';
import './Button.css';

interface ButtonProps {
  buttonText: string;
  type: 'button' | 'submit' | 'reset';
  className: string;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ 
    buttonText, 
    type, 
    className,
    onClick

}) => {
  return (
  <button 
  type={type}
  className={className}
  onClick={onClick}
  >
    {buttonText}
    </button>
  );
};

export default Button;
