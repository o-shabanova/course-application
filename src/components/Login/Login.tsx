import React, {useState} from 'react';
import './Login.css';
import generateId from '../../helpers/generateId';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';
import { handleFormChange } from '../../helpers/handleFormChange';
import { validateEmail, validatePassword } from '../../helpers/validation';
import { createEmailInputConfig, createPasswordInputConfig } from '../../helpers/createAuthInputConfig';

interface LoginProps {
    onNavigateToRegistration: () => void;
}


const Login: React.FC<LoginProps> = ({ onNavigateToRegistration }) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
    });

    const [touched, setTouched] = useState({
        email: false,
        password: false,
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
    });

    const [inputIds] = useState(() => ({
        email: generateId(),
        password: generateId(),
    }));

    const inputs = [
        createEmailInputConfig(inputIds.email, values.email),
        createPasswordInputConfig(inputIds.password, values.password)
    ];

    const onChange = handleFormChange(setValues);

    const handleBlur = (fieldName: keyof typeof values) => {
        setTouched({ ...touched, [fieldName]: true });
        
        let error = '';
        if (fieldName === 'email') {
            error = validateEmail(values.email);
        } else if (fieldName === 'password') {
            error = validatePassword(values.password);
        }
        
        setErrors({ ...errors, [fieldName]: error });
    };

    const handleFocus = (fieldName: keyof typeof values) => {
        setTouched({ ...touched, [fieldName]: false });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const emailError = validateEmail(values.email);
        const passwordError = validatePassword(values.password);

        setErrors({
            email: emailError,
            password: passwordError,
        });

        setTouched({
            email: true,
            password: true,
        });

        if (!emailError && !passwordError) {
            console.log(values);
        }
    };


    return (
        <>
        <form className="auth-container" onSubmit={handleSubmit} noValidate>
            <h2 className="auth-title">Login</h2>
            <fieldset className="auth-fieldset">
                <div className="auth-content">
                    {inputs.map((input) => {
                        const fieldName = input.name as keyof typeof touched;
                        const hasError = touched[fieldName] && errors[fieldName];
                        return (
                            <div key={input.id}>
                                <Input
                                    {...input}
                                    onChange={onChange}
                                    hasError={!!hasError}
                                    onFocus={() => handleFocus(input.name as keyof typeof values)}
                                    onBlur={() => handleBlur(input.name as keyof typeof values)}
                                />
                                {hasError && (
                                    <span className="error-message">{errors[fieldName]}</span>
                                )}
                            </div>
                        );
                    })}
                    <Button buttonText={BUTTON_TEXT.LOGIN} type="submit" className="main-button auth-button" />
                    <p className="auth-paragraph">If you don't have an account you may <span className="auth-link" onClick={onNavigateToRegistration}>Registration</span></p>
                </div>
            </fieldset>
        </form>
        </>
    );
};

export default Login;