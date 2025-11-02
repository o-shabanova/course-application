import generateId from './generateId';

interface InputConfig {
    id: string;
    name: string;
    className: string;
    labelClassName: string;
    labelText: string;
    type: string;
    placeholderText: string;
    value: string;
    errorMessage: string;
    pattern: string;
    title: string;
    required: boolean;
}

export const createEmailInputConfig = (
    inputId: string,
    value: string
): InputConfig => ({
    id: inputId,
    name: 'email',
    className: 'auth-input email-input',
    labelClassName: 'auth-label',
    labelText: 'Email',
    type: 'email',
    placeholderText: 'Enter your email',
    value,
    errorMessage: 'Email is required',
    pattern: "^[A-Za-z0-9_.-]+@([A-Za-z0-9-]+\\.)+[A-Za-z0-9-]{2,4}$",
    title: "Please enter a valid email address",
    required: true
});

export const createPasswordInputConfig = (
    inputId: string,
    value: string
): InputConfig => ({
    id: inputId,
    name: 'password',
    className: 'auth-input password-input',
    labelClassName: 'auth-label',
    labelText: 'Password',
    type: 'password',
    placeholderText: 'Enter your password',
    value,
    errorMessage: 'Password is required',
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d!@#$%^&*]{8,}$",
    title: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number",
    required: true
});

export const createNameInputConfig = (
    inputId: string,
    value: string
): InputConfig => ({
    id: inputId,
    name: 'name',
    className: 'auth-input name-input',
    labelClassName: 'auth-label',
    labelText: 'Name',
    type: 'text',
    placeholderText: 'Enter your name',
    value,
    errorMessage: 'Name is required',
    pattern: "^[A-Za-z0-9]{3,16}$",
    title: "Name must be between 3 and 16 characters and can only contain letters and numbers",
    required: true
});

