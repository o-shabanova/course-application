import React, {useState} from 'react'; 
import './Registration.css';
import {Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';
import generateId from '../../helpers/generateId';
import { handleFormChange } from '../../helpers/handleFormChange';
import { validateName, validateEmail, validatePassword } from '../../helpers/validation';
import { createEmailInputConfig, createPasswordInputConfig, createNameInputConfig } from '../../helpers/createAuthInputConfig';

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

    const [touched, setTouched] = useState({
        name: false,
        email: false,
        password: false,
    });

    const [errors, setErrors] = useState({
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
        createNameInputConfig(inputIds.name, values.name),
        createEmailInputConfig(inputIds.email, values.email),
        createPasswordInputConfig(inputIds.password, values.password)
    ];

    const onChange = handleFormChange(setValues);

    const handleBlur = (fieldName: keyof typeof values) => {
        setTouched({ ...touched, [fieldName]: true });
        
        let error = '';
        if (fieldName === 'name') {
            error = validateName(values.name);
        } else if (fieldName === 'email') {
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
        
        const nameError = validateName(values.name);
        const emailError = validateEmail(values.email);
        const passwordError = validatePassword(values.password);

        setErrors({
            name: nameError,
            email: emailError,
            password: passwordError,
        });

        setTouched({
            name: true,
            email: true,
            password: true,
        });

        if (!nameError && !emailError && !passwordError) {
            console.log(values);
        }
    };

    return (
        <>
        <form className="auth-container" onSubmit={handleSubmit}>
        <h2 className="auth-title">{title}</h2>
            <fieldset className="auth-fieldset">
                <div className="auth-content">
                        {inputs.map((input) => (
                            <Input 
                            key={input.id} 
                            {...input}
                            onChange={onChange}
                            touched={touched[input.name as keyof typeof touched]}
                            errorMessage={errors[input.name as keyof typeof errors]}
                            onFocus={() => handleFocus(input.name as keyof typeof values)}
                            onBlur={() => handleBlur(input.name as keyof typeof values)}
                            />
                        ))}
                    <Button buttonText={BUTTON_TEXT.REGISTER} type="submit" className="main-button auth-button" />
                    <p className="auth-paragraph">If you have an account you may <span className="auth-link" onClick={onNavigateToLogin}>Login</span></p>
                </div>
            </fieldset>
        </form>
        </>
    )
}