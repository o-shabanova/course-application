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
    pattern?: string;
    min?: number;
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

export const createTitleInputConfig = (
    inputId: string,
    value: string

): InputConfig => ({
    id: inputId,
    name: 'title',
    className: 'auth-input title-input',
    labelClassName: 'auth-label',
    labelText: 'Title',
    type: 'text',
    placeholderText: 'Input text',
    value,
    errorMessage: 'Title is required',
    pattern: "^[A-Za-z0-9]{3,16}$",
    title: "Title must be between 3 and 16 characters and can only contain letters and numbers",
    required: true
});

export const createDescriptionInputConfig = (
    inputId: string,
    value: string
): InputConfig => ({
    id: inputId,
    name: 'description',
    className: 'auth-input description-input',
    labelClassName: 'auth-label',
    labelText: 'Description',
    type: 'text',
    placeholderText: 'Input text',
    value,
    errorMessage: 'Description is required',
    pattern: "^[\\s\\S]{20,255}$",
    title: "Description must be between 20 and 255 characters and can contain letters, numbers and special characters",
    required: true
});

export const createDurationInputConfig = (
    inputId: string,
    value: string
): InputConfig => ({
    id: inputId,
    name: 'duration',
    className: 'auth-input duration-input',
    labelClassName: 'auth-label',
    labelText: 'Duration',
    type: 'number',
    placeholderText: 'Enter duration in minutes',
    value,
    errorMessage: 'Duration is required',
    min: 1,
    title: "Duration must be a positive number greater than 0 and can only contain numbers",
    required: true
});

export const createAuthorNameInputConfig = (
    inputId: string,
    value: string
): InputConfig => ({
    id: inputId,
    name: 'authorName',
    className: 'create-course-input author-name-input',
    labelClassName: 'auth-label',
    labelText: 'Author Name',
    type: 'text',
    placeholderText: 'Enter author name',
    value,
    errorMessage: 'Author Name is required',
    pattern: "^[A-Za-z\\s]{3,16}$",
    title: "Author Name must be between 3 and 16 characters and can only contain letters and spaces",
    required: true
});