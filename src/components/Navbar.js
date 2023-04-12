import {React,useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState('');
    useEffect(() => {
        fetchUser();
    },[]);
    const fetchUser = async () => {
        if(sessionStorage.getItem('userid') !== '') {
            const response = await fetch('https://thearmory-api.onrender.com/api/test/' + sessionStorage.getItem('userid'));
            const responseParsed = await response.json();
            setUser(responseParsed.name);
        }
    }
    const handleSignout = async () => {
        sessionStorage.removeItem('userid');
        //window.location.reload(true);
    }
    return (
        <nav style={{paddingTop:'30px',paddingBottom:'30px'}}>
            <ul style={{display:'flex',listStyle:'none'}}>
                <li style={{marginRight:'15px'}}><Link to="/">Home</Link></li>
                <li style={{marginRight:'15px'}}><Link to="/additem">Add Item</Link></li>
                <li style={{marginRight:'15px'}}><Link to="/generator">Generator</Link></li>
                <li style={{marginRight:'15px'}}><Link to="/inventory">Inventory</Link></li>
                <li style={{marginRight:'15px'}}><Link to="/signUp">Sign UP</Link></li>
                <li style={{marginRight:'15px'}}><Link to="/login">Login</Link></li>
                <li style={{marginRight:'15px'}}>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSeZD0URjf3DPHifbo9XJ31qVJtI39PFpCiI5qz_bF5_WernDQ/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
                        User Survey
                    </a>
                </li>
                {user && <li style={{marginRight:'15px'}}><p>Active User: {user}</p></li>}
                <li><button onClick={handleSignout}>Sign Out</button></li>
            </ul>
        </nav>
    );
}

export default Navbar;