import React from 'react';

interface ButtonProps {
  buttonText: string;
  onClick: () => void;
  type: 'button' | 'submit' | 'reset';
  className: string;

}

export const Button: React.FC<ButtonProps> = ({ 
    buttonText, 
    onClick, 
    type, 
    className

}) => {
  return (
  <button 
  onClick={onClick}
  type={type}
  className={className}
  >
    {buttonText}
    </button>
  );
};

export default Button;
