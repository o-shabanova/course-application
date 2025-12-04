import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Login.css';
import generateId from '../../helpers/generateId';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';
import { handleFormChange } from '../../helpers/handleFormChange';
import { validateEmail, validatePassword } from '../../helpers/validation';
import { createEmailInputConfig, createPasswordInputConfig } from '../../helpers/createAuthInputConfig';
import { API_BASE_URL } from '../../constants';
import { login } from '../../store/user/userSlice';
import { RootState } from '@/store';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isTokenExist = useSelector((state: RootState) => state.user.isAuth);
    useEffect(() => {
        if (isTokenExist) {
            navigate('/courses');
        }
    }, [isTokenExist, navigate]);

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

    const [loading, setLoading] = useState(false);
    const [apiErrors, setApiErrors] = useState<string[]>([]);


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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setApiErrors([]);
        
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

        if (emailError || passwordError) {
            return;
          }
        
          try {
            setLoading(true);
        
            const response = await fetch(`${API_BASE_URL}/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({          
                email: values.email,
                password: values.password,
              }),
            });
        
            const result = await response.json();
            if (response.ok) {
                const token = result.result;
                const name = result.user?.name || "";
                const email = result.user?.email || values.email;

                localStorage.setItem("token", token);

                if (name) {
                    localStorage.setItem("user", name);
                }
                localStorage.setItem("user", JSON.stringify({ name, email }));

                dispatch(login({ name, email, token }));

                setValues({ email: "", password: "" });
                setErrors({ email: "", password: "" });
                navigate("/courses");
            } else {
                setApiErrors([result.message || 'Login failed. Please try again.']);
            }
          } catch (err) {
            setApiErrors(['Network error. Please try again later.']);
          } finally {
            setLoading(false);
          }
    };


    return (
        <>
        <form className="auth-container" onSubmit={handleSubmit} noValidate>
            <h2 className="auth-title">Login</h2>
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
                        buttonText={loading ? "Logging in..." : BUTTON_TEXT.LOGIN} 
                        type="submit" 
                        className="main-button auth-button" 
                    />
                    <p className="auth-paragraph">If you don't have an account you may <Link to ="/registration" className="auth-link">Registration</Link></p>
                </div>
            </fieldset>
        </form>
        </>
    );
};

export default Login;