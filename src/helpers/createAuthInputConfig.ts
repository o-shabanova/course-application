interface InputConfig {
    id: string;
    name: string;
    className: string;
    labelClassName: string;
    labelText: string;
    type: string;
    placeholderText: string;
    value: string;
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
    required: true
});

export const createAuthorNameInputConfig = (
    inputId: string,
    value: string
): InputConfig => ({
    id: inputId,
    name: 'authorName',
    className: 'auth-input create-course-input author-name-input',
    labelClassName: 'auth-label',
    labelText: 'Author Name',
    type: 'text',
    placeholderText: 'Enter author name',
    value,
    required: true
});