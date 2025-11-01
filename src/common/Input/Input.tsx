import React, { useState } from 'react';
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
    errorMessage?: string,
    pattern?: string,
    title?: string
}

export const Input: React.FC<InputProps> = (props) => {
    const [focused, setFocused] = useState(false);

    const handleFocus = () => setFocused(true);


    return (
    <div className={props.className}>
        <label className={props.labelClassName}>{props.labelText}</label>
        <input 
        name={props.name}
        className="input" 
        type={props.type} 
        placeholder={props.placeholderText} 
        value={props.value}
        onChange={props.onChange} 
        required={props.required}
        pattern={props.pattern}
        title={props.title}
        onBlur={handleFocus}
        data-focused={focused.toString()}
        />
        <span className="error-message">{props.errorMessage}</span>
    </div>
)};