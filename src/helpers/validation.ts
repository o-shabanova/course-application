export const validateEmail = (email: string): string => {
    if (!email.trim()) {
        return 'Email is required';
    }
    return '';
};

export const validatePassword = (password: string): string => {
    if (!password.trim()) {
        return 'Password is required';
    }
    return '';
};

export const validateName = (name: string): string => {
    if (!name.trim()) {
        return 'Name is required';
    }
    return '';
};

export const validateTitle = (title: string): string => {
    const trimmedTitle = title.trim();


    if (trimmedTitle.length < 2) {
        return 'Title is required and should be at least 2 characters';
    }
    return '';
};

export const validateDescription = (description: string): string => {
    if (!description.trim() || description.trim().length < 2) {
        return 'Description is required and should be at least 2 characters';
    }
    return '';
};

export const validateDuration = (duration: string): string => {
    if (!duration.trim()) {
        return 'Duration is required and should be greater than 0';
    }
    const numValue = Number(duration);
    if (isNaN(numValue) || numValue <= 0) {
        return 'Duration is required and should be greater than 0';
    }
    return '';
};

export const validateAuthorName = (authorName: string): string => {
    if (!authorName.trim() || authorName.trim().length < 2) {
        return 'Author name should be at least 2 characters';
    }
    return '';
};

