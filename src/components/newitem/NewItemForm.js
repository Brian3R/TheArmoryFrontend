import React from 'react';
import {useState} from 'react';

import SubmitButton from './SubmitButton';

const NewItemForm = () => {
    //state variables
    const [name, setName] = useState('');
    const [region, setRegion] = useState(-1);
    const [type, setType] = useState('');
    const [color, setColor] = useState('');
    const [favorability, setFavorability] = useState('');
    const [failure, setFailure] = useState(false);
    //state change handlers
    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handleRegionChange = (event) => {
        setRegion(parseInt(event.target.value));
        console.log(region)
    }
    const handleTypeChange = (event) => {
        setType(event.target.value);
    }
    const handleColorChange = (event) => {
        setColor(event.target.value);
    }
    const handleFavorabilityChange = (event) => {
        setFavorability(parseInt(event.target.value));
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(name);
        console.log(region);
        console.log(type);
        console.log(color);
        console.log(favorability);
        if(!(name && region !== -1 && type && color && favorability)) {
            setFailure(true);
            return;
        }
        try {
            const response = await fetch('https://armory-api.onrender.com/api/test/'+ sessionStorage.getItem('userid'));
            const user = await response.json();
            const newItem = {
                title: name,
                clothing_type: type,
                body_region: region,
                color: color,
                favorability: favorability
            };
            user.inventory[region].push(newItem);
            const updateResponse = await fetch('https://armory-api.onrender.com/api/test/'+ sessionStorage.getItem('userid'), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const updatedUser = await updateResponse.json();
            console.log(updatedUser);
            setName('');
            setType('');
            setRegion(-1);
            setColor('');
           //window.location.reload(true);
        }
        catch (error) {
            console.error(error);
        }
        //window.location.reload(true);
    }
    const renderTypeDropdown = () => {
        switch(region) {
            case 0:
                return (
                    <select onChange={handleTypeChange}>
                        <option value={''}>Select a type</option>
                        <option value={'ss_tee'}>Short Sleeve Tee</option>
                        <option value={'ls_tee'}>Long Sleeve Tee</option>
                    </select>
                )
            case 1:
                return (
                    <select onChange={handleTypeChange}>
                        <option value={''}>Select a type</option>
                        <option value={'shorts'}>Shorts</option>
                        <option value={'jeans'}>Jeans</option>
                        <option value={'sweatpants'}>Sweatpants</option>
                    </select>
                )
            case 2:
                return (
                    <select onChange={handleTypeChange}>                        
                        <option value={''}>Select a type</option>
                        <option value={'running_shoes'}>Running Shoes</option>
                        <option value={'low_tops'}>Low Top Sneakers</option>
                        <option value={'high_tops'}>High Top Sneakers</option>
                    </select>
                )
            default:
                return null;
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label className='text'>Enter your garment name:</label>
            <br/>
            <input type="text" value={name} onChange={handleNameChange}/>
            <br/>
            <label className='text'>Select your item's body region:</label>
            <br/>
            <select onChange={handleRegionChange}>
                <option value={'-1'}>Select a region</option>
                <option value={'0'}>Top</option>
                <option value={'1'}>Bottom</option>
                <option value={'2'}>Shoes</option>
            </select>
            <br/>
            {region !== -1 && <label className='text'>Select your item's type:</label>}
            <br/>
            {renderTypeDropdown()}
            <br/>
            <label className='text'>Select your garment's color:</label>
            <br/>
            <select onChange={handleColorChange}>
                <option value={''}>Select a color</option>
                <option value={'red'}>Red</option>
                <option value={'pink'}>Pink</option>
                <option value={'orange'}>Orange</option>
                <option value={'yellow'}>Yellow</option>
                <option value={'green'}>Green</option>
                <option value={'lightBlue'}>Light Blue</option>
                <option value={'darkBlue'}>Dark Blue</option>
                <option value={'purple'}>Purple</option>
                <option value={'brown'}>Brown</option>
                <option value={'beige'}>Beige</option>
                <option value={'white'}>White</option>
                <option value={'gray'}>Gray</option>
                <option value={'black'}>Black</option>
            </select>
            <br/>
            <label className='text'>How much do you like this item (1-10)</label>
            <br/>
            <select onChange={handleFavorabilityChange}>
                <option value={''}>Select a favorability</option>
                <option value={'0'}>0</option>
                <option value={'1'}>1</option>
                <option value={'2'}>2</option>
                <option value={'3'}>3</option>
                <option value={'4'}>4</option>
                <option value={'5'}>5</option>
                <option value={'6'}>6</option>
                <option value={'7'}>7</option>
                <option value={'8'}>8</option>
                <option value={'9'}>9</option>
                <option value={'10'}>10</option>
            </select>
            <br/>
            {failure && <p className='text'>You must fill all fields before submitting</p>}
            <br/>
            <SubmitButton/>
        </form>
    );
}

export default NewItemForm;