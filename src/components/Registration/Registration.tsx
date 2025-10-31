import React from 'react'; 
import './Registration.css';
import {Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';

interface RegistrationProps {
    title: string;
    onSubmit: () => void;
}

export const Registration: React.FC<RegistrationProps> = ({ title, onSubmit }) => {
    return (
        <>
        <form className="registration-container">
        <h2 className="registration-title">{title}</h2>
            <fieldset className="registration-fieldset">
                <div className="registration-content">
                    <Input className="registration-input name-input" labelClassName="registration-label" labelText="Name" type="text" placeholderText="Enter your name" value="" onChange={() => {}} required={true} />
                    <Input className="registration-input email-input" labelClassName="registration-label" labelText="Email" type="email" placeholderText="Enter your email" value="" onChange={() => {}} required={true} />
                    <Input className="registration-input password-input" labelClassName="registration-label" labelText="Password" type="password" placeholderText="Enter your password" value="" onChange={() => {}} required={true} />
                    <Button buttonText={BUTTON_TEXT.REGISTER} type="submit" onClick={onSubmit} className="main-button registration-button" />
                    <p className="registration-paragraph">If you have an account you may <span className="registration-link">Login</span></p>
                </div>
            </fieldset>
        </form>
        </>
    )
}