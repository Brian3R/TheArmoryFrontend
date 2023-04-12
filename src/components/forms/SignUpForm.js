import React from 'react';
import {useState} from 'react';
import SubmitButton from '../newitem/SubmitButton';

const SignUpForm = () => {
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
        const check = await fetch('https://thearmory-api.onrender.com/api/test/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name, password})
            
        });
        const data = await check.json();
        if(data.success){
            try {
                const response = await fetch('https://thearmory-api.onrender.com/api/test/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        _id:"hello",
                        name: name,
                        password: password,
                        inventory: [[],[],[]]
                    })
                }
                );
                setName('');
                setPassword('');
            }
            catch (error) {
                console.error(error);
            }
            await setFailure(false);
            const response = await fetch('https://thearmory-api.onrender.com/api/test/search/' + name);
                let user = await response.json();
                setName('');
                setPassword('');
                sessionStorage.setItem('userid', user._id)

                //window.location.reload(true);

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
            {failure && <p style={{color:'red'}}>Username already exists. Please try again.</p>}
            <br/>
            <SubmitButton/>
        </form>
    );
}

export default SignUpForm;