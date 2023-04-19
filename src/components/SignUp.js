import React from 'react';
import Navbar from './Navbar';
import SignUpForm from './forms/SignUpForm';

const SignUp = () => {
    return(
        <div className='page'>
            <div>
                <Navbar/>
                <h1 className='text'>
                    Sign Up
                </h1>
                <p className='text' style={{width:'400px'}}>
                    WARNING: This website is a class project, and as such, does not have robust account security.
                    Please do not use any password that you use for other websites.
                </p>
                <SignUpForm/>
            </div>
            <br/>
            <br/>
            <p> </p>
        </div>
    );
}

export default SignUp;