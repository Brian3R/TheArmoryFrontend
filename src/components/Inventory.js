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
        setData(responseParsed.inventory)
    }
    if(!sessionStorage.getItem('userid')) {
        return (
            <div style={{height:'100vh',width:'100vw',backgroundColor:'#a9d1cc'}}>
                <div style={{width: '800px', margin: '0 auto'}}>
                    <Navbar/>
                    <p>Please log in!</p>
                </div>
            </div>
        );
    }
    if(!data) {return <div>Loading...</div>}

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


    const handleDeletion = async (deleted_item) => {
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
        <div style={{height:'100vh',width:'100vw',backgroundColor:'#a9d1cc'}}>
            <div style={{width: '800px', margin: '0 auto'}}>
                <Navbar/>
                <h1>
                    Inventory!
                </h1>
                <h2>
                    Tops:
                </h2>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={cellStyle}>Name</th>
                            <th style={cellStyle}>Type</th>
                            <th style={cellStyle}>Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data[0] && data[0].map((item) => (
                                <tr key={item.title}>
                                    <td style={cellStyle}>{item.title}</td>
                                    <td style={cellStyle}>{translateType(item.clothing_type)}</td>
                                    <td style={cellStyle}>{item.color}</td>                                
                                    <td style={cellStyle}><button onClick={() => handleDeletion(item)}>Delete</button></td>
                                </tr>
                        ))}
                    </tbody>
                </table>
                <h2>
                    Bottoms:
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th style={cellStyle}>Name</th>
                            <th style={cellStyle}>Type</th>
                            <th style={cellStyle}>Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data[1] && data[1].map((item) => (
                                <tr key={item.title}>
                                    <td style={cellStyle}>{item.title}</td>
                                    <td style={cellStyle}>{translateType(item.clothing_type)}</td>
                                    <td style={cellStyle}>{item.color}</td>
                                    <td style={cellStyle}><button onClick={() => handleDeletion(item)}>Delete</button></td>
                                </tr>
                        ))}
                    </tbody>
                </table>
                <h2>
                    Shoes:
                </h2>
                <table>
                    <thead>
                        <tr>
                            <th style={cellStyle}>Name</th>
                            <th style={cellStyle}>Type</th>
                            <th style={cellStyle}>Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data[2] && data[2].map((item) => (
                                <tr key={item.title}>
                                    <td style={cellStyle}>{item.title}</td>
                                    <td style={cellStyle}>{translateType(item.clothing_type)}</td>
                                    <td style={cellStyle}>{item.color}</td>
                                    <td style={cellStyle}><button onClick={() => handleDeletion(item)}>Delete</button></td>
                                </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Inventory;