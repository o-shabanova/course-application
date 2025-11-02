import React, {useState} from 'react';
import './Login.css';
import generateId from '../../helpers/generateId';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';

interface LoginProps {
    title: string,
    onNavigateToRegistration: () => void;
}


const Login: React.FC<LoginProps> = ({ title, onNavigateToRegistration }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [inputIds] = useState(() => ({
        email: generateId(),
        password: generateId(),
    }));

    const inputs = [
        {
            id: inputIds.email,
            name: 'email',
            className: 'auth-input email-input',
            labelClassName: 'auth-label',
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
            className: 'auth-input password-input',
            labelClassName: 'auth-label',
            labelText: 'Password',
            type: 'password',
            placeholderText: 'Enter your password',
            value: values.password,
            errorMessage: 'Password is required',
            pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d!@#$%^&*]{8,}$",
            title: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
            required: true

        }
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(values);
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };


    return (
        <>
        <form className="auth-container" onSubmit={handleSubmit}>
            <h2 className="auth-title">{title}</h2>
            <fieldset className="auth-fieldset">
                <div className="auth-content">
                    {inputs.map((input) => (<Input
                    key={input.id}
                    {...input}
                    onChange={handleChange}
                    />
                    ))}
                    <Button buttonText={BUTTON_TEXT.LOGIN} type="submit" className="main-button auth-button" />
                    <p className="auth-paragraph">If you don't have an account you may <span className="auth-link" onClick={onNavigateToRegistration}>Registration</span></p>
                </div>
            </fieldset>
        </form>
        </>
    );
};

export default Login;