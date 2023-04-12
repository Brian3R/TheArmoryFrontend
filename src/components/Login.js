import React from 'react';
import Navbar from './Navbar';
import LoginForm from './forms/LoginForm';

const Login = () => {
    return(
        <div style={{height:'100vh',width:'100vw',backgroundColor:'#a9d1cc'}}>
            <div style={{width: '800px', margin: '0 auto'}}>
                <Navbar/>
                <h1>
                    Login
                </h1>
                <LoginForm/>
            </div>
        </div>
    );
}

export default Login;