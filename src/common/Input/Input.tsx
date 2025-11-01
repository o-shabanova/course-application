import React from 'react';
import { InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps {
    labelText: string,
    type: InputHTMLAttributes<HTMLInputElement>['type'],
    placeholderText: string,  
    value: string,
    required: boolean,
    className?: string,
    labelClassName?: string,
    setValue: (value: string) => void;
}

export const Input: React.FC<InputProps> = (props) => 
     (
    <div className={props.className}>
        <label className={props.labelClassName}>{props.labelText}</label>
        <input 
        className="input" type={props.type} 
        placeholder={props.placeholderText} 
        value={props.value}
        onChange={(e) => props.setValue(e.target.value)} 
        required={props.required} />
    </div>
);