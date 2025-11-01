import React, {useState} from 'react'; 
import './Registration.css';
import {Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';
import generateId from '../../helpers/generateId';

interface RegistrationProps {
    title: string;
    onSubmit: () => void;
    onNavigateToLogin: () => void;
}

export const Registration: React.FC<RegistrationProps> = ({ title, onSubmit, onNavigateToLogin }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [inputIds] = useState(() => ({
        name: generateId(),
        email: generateId(),
        password: generateId(),
    }));


    const inputs = [
        {   id: inputIds.name,
            className: 'registration-input name-input',
            labelClassName: 'registration-label',
            labelText: 'Name',
            type: 'text',
            placeholderText: 'Enter your name',
            value: values.name,
            required: true,
            setValue: (value: string) => setValues({...values, name: value})
        },
        {
            id: inputIds.email,
            className: 'registration-input email-input',
            labelClassName: 'registration-label',
            labelText: 'Email',
            type: 'email',
            placeholderText: 'Enter your email',
            value: values.email,
            required: true,
            setValue: (value: string) => setValues({...values, email: value})
        },
        {
            id: inputIds.password,
            className: 'registration-input password-input',
            labelClassName: 'registration-label',
            labelText: 'Password',
            type: 'password',
            placeholderText: 'Enter your password',
            value: values.password,
            required: true,
            setValue: (value: string) => setValues({...values, password: value})
        }
    ]


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }
    return (
        <>
        <form className="registration-container" onSubmit={handleSubmit}>
        <h2 className="registration-title">{title}</h2>
            <fieldset className="registration-fieldset">
                <div className="registration-content">
                        {inputs.map((input) => (
                            <Input 
                            key={input.id} 
                            {...input}
                            />
                        ))}
                    <Button buttonText={BUTTON_TEXT.REGISTER} type="submit" onClick={onSubmit} className="main-button registration-button" />
                    <p className="registration-paragraph">If you have an account you may <span className="registration-link" onClick={onNavigateToLogin}>Login</span></p>
                </div>
            </fieldset>
        </form>
        </>
    )
}