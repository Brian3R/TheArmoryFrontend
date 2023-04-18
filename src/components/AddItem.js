import React from 'react';
import Navbar from './Navbar';
import NewItemForm from './newitem/NewItemForm';

const AddItem = () => {
    if(!sessionStorage.getItem('userid')) {
        return (
            <div className='page'>
                <div>
                    <Navbar/>
                    <p className='text'>Please log in!</p>
                </div>
                <br/>
            <br/>
            <p> </p>
            </div>
        );
    }
    return(
        <div className='page'>
            <div>
                <Navbar/>
                <h1 className='text'>
                    Add Item!
                </h1>
                <NewItemForm/>
            </div>
            <br/>
            <br/>
            <p> </p>
        </div>
    );
}

export default AddItem;