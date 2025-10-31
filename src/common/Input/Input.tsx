import React from 'react';
import { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps {
    labelText: string,
    type: InputHTMLAttributes<HTMLInputElement>['type'],
    placeholderText: string,
    value: string,  
    onChange: (value: string) => void,
    required: boolean,
    className?: string
}

export const Input: React.FC<InputProps> = ({ labelText, type, placeholderText, value, onChange, required, className }) =>  (
    <div className={className}>
        <label>{labelText}</label>
        <input className="input" type={type} placeholder={placeholderText} value={value} onChange={(e) => onChange(e.target.value)} required={required} />
    </div>
);