import React, {useState} from 'react'; 
import './Registration.css';
import {Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';
import generateId from '../../helpers/generateId';

interface RegistrationProps {
    title: string;
    onNavigateToLogin: () => void;
}

export const Registration: React.FC<RegistrationProps> = ({ title, onNavigateToLogin }) => {
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
            errorMessage: 'Name is required',
            pattern: "^[A-Za-z0-9]{3,16}$",
            title: "Name must be between 3 and 16 characters and can only contain letters and numbers",
            required: true
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
            errorMessage: 'Email is required',
            pattern: "^[A-Za-z0-9_.-]+@([A-Za-z0-9-]+\\.)+[A-Za-z0-9-]{2,4}$",
            title: "Please enter a valid email address",
            required: true
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
            errorMessage: 'Password is required',
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d!@#$%^&*]{8,}$",
            title: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
            required: true
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
                    <Button buttonText={BUTTON_TEXT.REGISTER} type="submit" className="main-button registration-button" />
                    <p className="registration-paragraph">If you have an account you may <span className="registration-link" onClick={onNavigateToLogin}>Login</span></p>
                </div>
            </fieldset>
        </form>
        </>
    )
}