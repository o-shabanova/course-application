import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import generateId from '../../helpers/generateId';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';
import { handleFormChange } from '../../helpers/handleFormChange';
import { validateEmail, validatePassword } from '../../helpers/validation';
import { createEmailInputConfig, createPasswordInputConfig } from '../../helpers/createAuthInputConfig';
import { API_BASE_URL } from '../../constants';

interface LoginSuccessResponse {
    successful: true;
    result: string; 
    user: {
        email: string;
        name: string;
      };
  }
  
  interface LoginErrorResponse {
    successful: false;
    result: string | string[];
  }
  
  type LoginResponse = LoginSuccessResponse | LoginErrorResponse;


const Login: React.FC = () => {
    const navigate = useNavigate();

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
        
            const data: LoginResponse = await response.json();
        
            console.log('Login status:', response.status);
            console.log('Login data:', data);
        
            if (!data.successful) {
                if (typeof data.result === 'string') {
                    setApiErrors([data.result]);
              } else if (Array.isArray(data.result)) {
                setApiErrors(data.result);
              } else {
                setApiErrors(['Login failed. Please try again.']);
              }
              return;
            }
        
            const token = data.result;
            const user = data.user;

            if (token && user) {
              localStorage.setItem('token', token);
              localStorage.setItem('user', user.name);

              console.log("Saved token:", token);
              console.log("Saved user:", user.name);
              console.log('data:', data);
        
              navigate('/courses');
            } else {
              setApiErrors(['Invalid response from server.']);
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