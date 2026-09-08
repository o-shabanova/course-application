import React, {useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Registration.css';
import {Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';
import generateId from '../../helpers/generateId';
import { handleFormChange } from '../../helpers/handleFormChange';
import { validateName, validateEmail, validatePassword } from '../../helpers/validation';
import { createEmailInputConfig, createPasswordInputConfig, createNameInputConfig } from '../../helpers/createAuthInputConfig';
import { registerUser } from '../../services';

const Registration: React.FC = () => {
    const navigate = useNavigate();
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

    const [loading, setLoading] = useState(false);
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setApiErrors([]);
        
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

        // If local validation failed, do not call the API
        if (nameError || emailError || passwordError) {
            return;
          }
      
          try {
            setLoading(true);

            const result = await registerUser(values);

            if (result.ok) {
                navigate('/login');
                return;
            }

            if (result.reason === 'validation') {
                setApiErrors(result.errors);
                return;
            }

            setApiErrors([result.message]);
          } catch (err) {
            const message = err instanceof Error
                ? err.message
                : 'Network error. Please try again later.';
            setApiErrors([message]);
          } finally {
            setLoading(false);
          }
    };

    return (
        <>
        <form className="auth-container" onSubmit={handleSubmit} noValidate>
        <h2 className="auth-title">Registration</h2>
        
            {apiErrors.length > 0 && (
                <ul className="api-errors">
                {apiErrors.map((msg) => (
                    <li key={msg}>{msg}</li>
                ))}
                </ul>
            )}
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
                    <Button 
                    buttonText={loading ? "Registering..." : BUTTON_TEXT.REGISTER}
                    type="submit" 
                    className="main-button auth-button" />
                    <p className="auth-paragraph">If you have an account you may <Link to="/login" className="auth-link">Login</Link></p>
                </div>
            </fieldset>
        </form>
        </>
    )
}

export default Registration;