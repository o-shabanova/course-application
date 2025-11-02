import React, {useState} from 'react'; 
import './Registration.css';
import {Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { BUTTON_TEXT } from '../../constants';
import generateId from '../../helpers/generateId';
import { handleFormChange } from '../../helpers/handleFormChange';
import { handleFormSubmit } from '../../helpers/handleFormSubmit';
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

    const onSubmit = handleFormSubmit(values);
    const onChange = handleFormChange(setValues);

    return (
        <>
        <form className="auth-container" onSubmit={onSubmit}>
        <h2 className="auth-title">{title}</h2>
            <fieldset className="auth-fieldset">
                <div className="auth-content">
                        {inputs.map((input) => (
                            <Input 
                            key={input.id} 
                            {...input}
                            onChange={onChange}
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