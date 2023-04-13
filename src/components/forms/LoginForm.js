import React from 'react';
import {useState} from 'react';
import SubmitButton from '../newitem/SubmitButton';


const LoginForm = () => {
    //state variables
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [failure, setFailure] = useState(false);
    //state change handlers
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const check = await fetch('https://armory-api.onrender.com/api/test/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, password})
            
        });
        const data = await check.json();
        if(data.success){
            try {
                const response = await fetch('https://armory-api.onrender.com/api/test/search/' + name);
                let user = await response.json();
                setName('');
                setPassword('');
                sessionStorage.setItem('userid', user._id)
            }
            catch (error) {
                console.error(error);
            }
            await setFailure(false);
            //window.location.reload(true);
            console.log("User Id: " + sessionStorage.getItem('userid'))
        }
        else{
            setFailure(true);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Enter your Username:</label>
            <br/>
            <input type="text" value={name} onChange={handleNameChange}/>
            <br/>
            <label>Enter your Password:</label>
            <br/>
            <input type="text" value={password} onChange={handlePasswordChange}/>
            <br/>
            {failure && <p style={{color:'red'}}>Wrong username or password. Please try again.</p>}
            <br/>
            <SubmitButton/>
        </form>
    );
}

export default LoginForm;
