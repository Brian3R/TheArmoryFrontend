import React from 'react';
import Navbar from './Navbar';
import '../App.css';

const Home = () => {
    return (
        <div className='page'>
            <div>
                <Navbar/>
                <h1 className='text'>
                    Home!
                </h1>
                <p className='text'>Welcome to the Armory. Please sign up or login to access the inventory, new item screen, and generator.</p>
            </div>
        </div>
    );
}

export default Home;