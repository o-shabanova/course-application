import React from 'react';
import { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps {
    labelText: string,
    type: InputHTMLAttributes<HTMLInputElement>['type'],
    name: string,
    placeholderText: string,  
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    required?: boolean,
    className?: string,
    labelClassName?: string,
    hasError?: boolean,
    onFocus?: () => void,
    onBlur?: () => void
}

export const Input: React.FC<InputProps> = (props) => {
    return (
    <div className={props.className}>
        <label className={props.labelClassName}>{props.labelText}</label>
        <input 
        name={props.name}
        className={`input ${props.hasError ? 'input-error' : ''}`}
        type={props.type} 
        placeholder={props.placeholderText} 
        value={props.value}
        onChange={props.onChange} 
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        required={props.required}
        />
    </div>
)};