import React, {useState} from 'react';
import './Login.css';
import generateId from '../../helpers/generateId';
import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';
import { handleFormChange } from '../../helpers/handleFormChange';
import { handleFormSubmit } from '../../helpers/handleFormSubmit';
import { createEmailInputConfig, createPasswordInputConfig } from '../../helpers/createAuthInputConfig';

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
        createEmailInputConfig(inputIds.email, values.email),
        createPasswordInputConfig(inputIds.password, values.password)
    ];

    const onSubmit = handleFormSubmit(values);
    const onChange = handleFormChange(setValues);


    return (
        <>
        <form className="auth-container" onSubmit={onSubmit}>
            <h2 className="auth-title">{title}</h2>
            <fieldset className="auth-fieldset">
                <div className="auth-content">
                    {inputs.map((input) => (<Input
                    key={input.id}
                    {...input}
                    onChange={onChange}
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