import React from 'react';
import Navbar from './Navbar';
import LoginForm from './forms/LoginForm';

const Login = () => {
    return(
        <div className='page'>
            <div>
                <Navbar/>
                <h1 className='text'>
                    Login
                </h1>
                <LoginForm/>
            </div>
        </div>
    );
}

export default Login;