import React from 'react'; 
import './Registration.css';
import {Input } from '../../common/Input/Input';

interface RegistrationProps {
    title: string;
    buttonText: string;
    onSubmit: () => void;
}

export const Registration: React.FC<RegistrationProps> = ({ title, buttonText, onSubmit }) => {
    return (
        <>
        <form className="registration-container">
            <fieldset>
                <legend>{title}</legend>
                <Input labelText="Name" type="text" placeholderText="Enter your name" value="" onChange={() => {}} required={true} />
                <Input labelText="Email" type="email" placeholderText="Enter your email" value="" onChange={() => {}} required={true} />
                <Input labelText="Password" type="password" placeholderText="Enter your password" value="" onChange={() => {}} required={true} />
            <button className="registration-button" onClick={onSubmit}>{buttonText}</button>
            </fieldset>
        </form>
        <p>If you have an account you may <span>Login</span></p>
        </>
    )
}