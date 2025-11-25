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
    const [touched, setTouched] = useState(false);

    const handleFocus = () => {
        setTouched(false);
    };

    const handleBlur = () => {
        setTouched(true);
    };

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
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={props.required}
        pattern={props.pattern}
        title={props.title}
        data-touched={touched.toString()}
        />
        <span className="error-message">{props.errorMessage}</span>
    </div>
)};