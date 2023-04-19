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
                <p className='text' style={{width:'600px'}}>
                    Welcome to the Armory. Please sign up or login to access the inventory, new item screen, and generator.
                </p>
                <h2 className='text'>
                    Get Started
                </h2>
                <p style={{width:'600px'}}className='text'>
                    To begin, please click Sign UP to create an account. Once your account is created, add some items to your
                    inventory using the Add Item page. Once your inventory has been filled, use the Generator to recieve outfits.
                </p>
                <h2 className='text'>
                    Background
                </h2>
                <p style={{width:'600px'}}className='text'>
                    Our algorithm is based on two data points: Colors and favorability scores. First, we choose the top for the outfit
                    based on favorability scores, then we choose the pants and shoes based on favorability, how they match with each other,
                    and how they match with the already-selected shirt. We take feedback from you when you 'like' and 'dislike' outfits,
                    editing the favorability scores of the items accordingly. If you'd like to manually change the favorability of an item,
                    you can do that in the inventory screen.
                </p>
            </div>
            <br/>
            <br/>
            <p> </p>
        </div>
    );
}

export default Home;