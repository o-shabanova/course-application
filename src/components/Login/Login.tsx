import React from 'react';
import './Login.css';

interface LoginProps {
    onNavigateToRegistration: () => void;
}

const Login: React.FC<LoginProps> = ({ onNavigateToRegistration }) => {
    return (
        <div>
            <h1>Login</h1>
            <p>If you don't have an account you may <span className="registration-link" onClick={onNavigateToRegistration}>Registration</span></p>
        </div>
    );
};

export default Login;