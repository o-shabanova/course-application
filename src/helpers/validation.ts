export const validateEmail = (email: string): string => {
    if (!email.trim()) {
        return 'Email is required';
    }
    // const emailRegex = /^[A-Za-z0-9_.-]+@([A-Za-z0-9-]+\.)+[A-Za-z0-9-]{2,4}$/;
    // if (!emailRegex.test(email.trim())) {
    //     return 'Please enter a valid email address';
    // }
    return '';
};

export const validatePassword = (password: string): string => {
    if (!password.trim()) {
        return 'Password is required';
    }
    // if (password.length < 8) {
    //     return 'Password must be at least 8 characters long';
    // }
    // if (!/(?=.*[a-z])/.test(password)) {
    //     return 'Password must contain at least one lowercase letter';
    // }
    // if (!/(?=.*[A-Z])/.test(password)) {
    //     return 'Password must contain at least one uppercase letter';
    // }
    // if (!/(?=.*\d)/.test(password)) {
    //     return 'Password must contain at least one number';
    // }
    return '';
};

export const validateName = (name: string): string => {
    if (!name.trim()) {
        return 'Name is required';
    }
    // if (name.trim().length < 3 || name.trim().length > 16) {
    //     return 'Name must be between 3 and 16 characters';
    // }
    // if (!/^[A-Za-z0-9]+$/.test(name.trim())) {
    //     return 'Name can only contain letters and numbers';
    // }
    return '';
};

export const validateTitle = (title: string): string => {
    const trimmedTitle = title.trim();


    if (trimmedTitle.length < 2) {
        return 'Title is required and should be at least 2 characters';
    }
    // if (!/^[A-Za-z0-9\s]+$/.test(trimmedTitle)) {
    //     return 'Title is required and should be at least 2 characters';
    // }
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
    // if (!/^[A-Za-z\s]+$/.test(authorName.trim())) {
    //     return 'Author Name can only contain letters and spaces';
    // }
    return '';
};

