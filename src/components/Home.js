import React from 'react';
import Navbar from './Navbar';

const Home = () => {
    return (
        <div style={{height:'100vh',width:'100vw',backgroundColor:'#a9d1cc'}}>
            <div style={{width: '800px', margin: '0 auto'}}>
                <Navbar/>
                <h1>
                    Home!
                </h1>
                <p>Welcome to the Armory. Please sign up or login to access the inventory, new item screen, and generator.</p>
            </div>
        </div>
    );
}

export default Home;