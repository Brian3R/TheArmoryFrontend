import React from 'react';
import Navbar from './Navbar'
import {useState, useEffect} from 'react';


const Inventory = () => {
    const [data,setData] = useState([]);
    useEffect(() => {
        fetchInventory();
    },[])
    const fetchInventory = async () => {
        const response = await fetch('https://armory-api.onrender.com/api/test/' + sessionStorage.getItem('userid'))
        const responseParsed = await response.json()
        setData(responseParsed);
    }
    if(!sessionStorage.getItem('userid')) {
        return (
            <div className='page'>
                <div>
                    <Navbar/>
                    <p className='text'>Please log in!</p>
                </div>
            </div>
        );
    }
    if(!data) {return <div className='page'>Loading...</div>}

    const translateType = (type) => {
        switch(type) {
            case 'ls_tee': return 'Long-Sleeve Tee';
            case 'ss_tee': return 'Short-Sleeve Tee';
            case 'jeans': return 'Jeans';
            case 'shorts': return 'Shorts';
            case 'sweatpants': return 'Sweatpants';
            case 'running_shoes': return 'Running Shoes';
            case 'high_tops': return 'High-top Sneakers';
            case 'low_tops': return 'Low-top Sneakers';
            default: return type;
        }
    }


    const handleItemDeletion = async (deleted_item) => {
        console.log(deleted_item);
        try {
            const response = await fetch('https://armory-api.onrender.com/api/test/' + sessionStorage.getItem('userid'));
            let user = await response.json();
            user.inventory[deleted_item.body_region] = user.inventory[deleted_item.body_region].filter((item) => item.title !== deleted_item.title);
            const updateResponse = await fetch('https://armory-api.onrender.com/api/test/' + sessionStorage.getItem('userid'), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            fetchInventory();
        }
        catch (error) {
            console.error(error);
        }
    }

    const handleOutfitDeletion = async(deleted_outfit) => {
        console.log(deleted_outfit);
        try {
            const response = await fetch('https://armory-api.onrender.com/api/test/' + sessionStorage.getItem('userid'));
            let user = await response.json();
            user.saved_outfits = user.saved_outfits.filter((outfit) => outfit[0].title !== deleted_outfit[0].title && 
                                                                       outfit[1].title !== deleted_outfit[1].title &&
                                                                       outfit[2].title !== deleted_outfit[2].title);
            const updateResponse = await fetch('https://armory-api.onrender.com/api/test/' + sessionStorage.getItem('userid'), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            fetchInventory();
        }
        catch (error) {
            console.error(error);
        }
    }
    const handleFavorabilityChange = async (liked, changed_item, region) => {
        try {
            const response = await fetch('https://armory-api.onrender.com/api/test/' + sessionStorage.getItem('userid'));
            let user = await response.json();
            let index = user.inventory[region].findIndex(item => item.title === changed_item.title);
            if(liked && user.inventory[region][index].favorability < 10) {user.inventory[region][index].favorability++;}
            if(!liked && user.inventory[region][index].favorability > 0) {user.inventory[region][index].favorability--;}
            const updateResponse = await fetch('https://armory-api.onrender.com/api/test/' + sessionStorage.getItem('userid'), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            await fetchInventory();
        }
        catch (error) {
            console.error(error);
        }
    }
    const tableStyle = {
        borderCollapse: 'collapse',
    };

    const cellStyle = {
        width: '150px',
        border: '2px solid black',
        padding: '8px',
        backgroundColor:'#FFFFFF'
    };

    return (
        <div className='page'>
            <div>
                <Navbar/>
                <h1 className='text'>
                    Inventory!
                </h1>
                <h2 className='text'>
                    Tops:
                </h2>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={cellStyle}>Name</th>
                            <th style={cellStyle}>Type</th>
                            <th style={cellStyle}>Color</th>
                            <th style={cellStyle}>Favorability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.inventory && data.inventory[0] && data.inventory[0].map((item) => (
                            <tr key={item.title}>
                                <td style={cellStyle}>{item.title}</td>
                                <td style={cellStyle}>{translateType(item.clothing_type)}</td>
                                <td style={cellStyle}>{item.color}</td>    
                                <td style={cellStyle}>
                                    <div style={{display:'flex',justifyContent:'space-between'}}>
                                        <div>{item.favorability}</div>
                                        <div>
                                            <button onClick={() => handleFavorabilityChange(true,item,0)}>+</button>
                                            <button onClick={() => handleFavorabilityChange(false,item,0)}>-</button>
                                        </div>
                                    </div>
                                </td>
                                <td><button onClick={() => handleItemDeletion(item)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2 className='text'>
                    Bottoms:
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th style={cellStyle}>Name</th>
                            <th style={cellStyle}>Type</th>
                            <th style={cellStyle}>Color</th>
                            <th style={cellStyle}>Favorability</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {data.inventory && data.inventory[1] && data.inventory[1].map((item) => (
                                <tr key={item.title}>
                                    <td style={cellStyle}>{item.title}</td>
                                    <td style={cellStyle}>{translateType(item.clothing_type)}</td>
                                    <td style={cellStyle}>{item.color}</td>
                                    <td style={cellStyle}>
                                        <div style={{display:'flex',justifyContent:'space-between'}}>
                                            <div>{item.favorability}</div>
                                            <div>
                                                <button onClick={() => handleFavorabilityChange(true,item,1)}>+</button>
                                                <button onClick={() => handleFavorabilityChange(false,item,1)}>-</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td><button onClick={() => handleItemDeletion(item)}>Delete</button></td>
                                </tr>
                        ))}
                    </tbody>
                </table>
                <h2 className='text'>
                    Shoes:
                </h2>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={cellStyle}>Name</th>
                            <th style={cellStyle}>Type</th>
                            <th style={cellStyle}>Color</th>
                            <th style={cellStyle}>Favorability</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.inventory && data.inventory[2] && data.inventory[2].map((item) => (
                                <tr key={item.title}>
                                    <td style={cellStyle}>{item.title}</td>
                                    <td style={cellStyle}>{translateType(item.clothing_type)}</td>
                                    <td style={cellStyle}>{item.color}</td>
                                    <td style={cellStyle}>
                                        <div style={{display:'flex',justifyContent:'space-between'}}>
                                            <div>{item.favorability}</div>
                                            <div>
                                                <button onClick={() => handleFavorabilityChange(true,item,2)}>+</button>
                                                <button onClick={() => handleFavorabilityChange(false,item,2)}>-</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td><button onClick={() => handleItemDeletion(item)}>Delete</button></td>
                                </tr>
                        ))}
                    </tbody>
                </table>
                <br/>
                <h2 className='text'>
                    Saved Outfits:
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th style={cellStyle}>Name</th>
                            <th style={cellStyle}>Type</th>
                            <th style={cellStyle}>Color</th>
                        </tr>
                    </thead>
                </table>
                {data.saved_outfits && data.saved_outfits.map((outfit) => (
                    <table>
                        <tbody>
                            <tr key={outfit[0]}>
                                <td style={cellStyle}>{outfit[0].title}</td>
                                <td style={cellStyle}>{translateType(outfit[0].clothing_type)}</td>
                                <td style={cellStyle}>{outfit[0].color}</td>
                            </tr>
                            <tr key={outfit[1]}>
                                <td style={cellStyle}>{outfit[1].title}</td>
                                <td style={cellStyle}>{translateType(outfit[1].clothing_type)}</td>
                                <td style={cellStyle}>{outfit[1].color}</td>
                                <td><button onClick={() => handleOutfitDeletion(outfit)}>Delete</button></td>
                            </tr>
                            <tr key={outfit[2]}>
                            <td style={cellStyle}>{outfit[2].title}</td>
                                <td style={cellStyle}>{translateType(outfit[2].clothing_type)}</td>
                                <td style={cellStyle}>{outfit[2].color}</td>
                            </tr>
                        </tbody>
                    </table>
                ))}
                <br/>
                <br/>
                <p> </p>
            </div>
        </div>
    );
}

export default Inventory;