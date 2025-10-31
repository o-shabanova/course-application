import React from 'react'; 
import './Registration.css';
import {Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';

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
                <Button buttonText={BUTTON_TEXT.REGISTER} type="submit" onClick={onSubmit} className="main-button registration-button" />
            </fieldset>
        </form>
        <p>If you have an account you may <span>Login</span></p>
        </>
    )
}