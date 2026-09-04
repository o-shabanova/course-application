import React from 'react';

export const handleFormChange = <T extends Record<string, string>>(
    setValues: React.Dispatch<React.SetStateAction<T>>
) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prevValues) => ({ ...prevValues, [e.target.name]: e.target.value }));
    };
};

