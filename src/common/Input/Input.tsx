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
    required: boolean,
    className?: string,
    labelClassName?: string,
}

export const Input: React.FC<InputProps> = (props) => 
     (
    <div className={props.className}>
        <label className={props.labelClassName}>{props.labelText}</label>
        <input 
        name={props.name}
        className="input" 
        type={props.type} 
        placeholder={props.placeholderText} 
        value={props.value}
        onChange={props.onChange} 
        required={props.required} />
    </div>
);