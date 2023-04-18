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
                <SignUpForm/>
            </div>
            <br/>
            <br/>
            <p> </p>
        </div>
    );
}

export default SignUp;