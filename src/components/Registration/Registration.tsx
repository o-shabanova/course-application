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
            name: 'name',
            className: 'registration-input name-input',
            labelClassName: 'registration-label',
            labelText: 'Name',
            type: 'text',
            placeholderText: 'Enter your name',
            value: values.name,
            required: true,
        },
        {
            id: inputIds.email,
            name: 'email',
            className: 'registration-input email-input',
            labelClassName: 'registration-label',
            labelText: 'Email',
            type: 'email',
            placeholderText: 'Enter your email',
            value: values.email,
            required: true,
        },
        {
            id: inputIds.password,
            name: 'password',
            className: 'registration-input password-input',
            labelClassName: 'registration-label',
            labelText: 'Password',
            type: 'password',
            placeholderText: 'Enter your password',
            value: values.password,
            required: true,
        }
    ]


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(values);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };

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
                            onChange={handleChange}
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