import React from 'react';

export const handleFormSubmit = <T extends Record<string, string>>(
    values: T,
    callback?: (values: T) => void
) => {
    return (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (callback) {
            callback(values);
        } else {
            console.log(values);
        }
    };
};

