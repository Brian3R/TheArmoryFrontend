import {React,useEffect,useState} from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => {
    const [user, setUser] = useState('');
    useEffect(() => {
        fetchUser();
    },[]);
    const fetchUser = async () => {
        if(sessionStorage.getItem('userid') !== '') {
            const response = await fetch('https://armory-api.onrender.com/api/test/' + sessionStorage.getItem('userid'));
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
                <button className='navButton'><li><Link className='navText' to="/">Home</Link></li></button>
                <button className='navButton'><li><Link className='navText' to="/additem">Add Item</Link></li></button>
                <button className='navButton'><li><Link className='navText' to="/generator">Generator</Link></li></button>
                <button className='navButton'><li><Link className='navText' to="/inventory">Inventory</Link></li></button>
                <button className='navButton'><li><Link className='navText' to="/signUp">Sign UP</Link></li></button>
                <button className='navButton'><li><Link className='navText' to="/login">Login</Link></li></button>
                <button className='navButton'><li>
                    <a className='navText' href="https://docs.google.com/forms/d/e/1FAIpQLSeZD0URjf3DPHifbo9XJ31qVJtI39PFpCiI5qz_bF5_WernDQ/viewform?usp=sf_link" target="_blank" rel="noopener noreferrer">
                        User Survey
                    </a>
                </li></button>
                {user && <li><p className='activeUser'>Active User: {user}</p></li>}
                <li><button className='signOut' onClick={handleSignout}>Sign Out</button></li>
            </ul>
        </nav>
    );
}

export default Navbar;