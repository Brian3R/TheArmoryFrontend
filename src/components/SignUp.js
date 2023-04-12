import React from 'react';
import Navbar from './Navbar';
import SignUpForm from './forms/SignUpForm';

const SignUp = () => {
    return(
        <div style={{height:'100vh',width:'100vw',backgroundColor:'#a9d1cc'}}>
            <div style={{width: '800px', margin: '0 auto'}}>
                <Navbar/>
                <h1>
                    Sign Up
                </h1>
                <SignUpForm/>
            </div>
        </div>
    );
}

export default SignUp;