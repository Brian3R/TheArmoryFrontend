import React from 'react';
import Navbar from './Navbar';
import {useState, useEffect} from 'react';
import generation from '../functions/generation';
import outfitScoreChanger from '../functions/outfitScoreChanger';


const Generator = () => {
    const [inventory, setInventory] = useState([]);
    const [indexes, setIndexes] = useState(null);
    const [alreadyLiked, setAlreadyLiked] = useState(false);
    const [alreadySaved, setAlreadySaved] = useState(false);
    useEffect(() => {
        fetchInventory();
    },[]);
    const fetchInventory = async () => {
        const response = await fetch('https://armory-api.onrender.com/api/test/'+ sessionStorage.getItem('userid'));
        const responseParsed = await response.json();
        setInventory(responseParsed.inventory);
    }
    const handleGeneration = () => {
        setIndexes(generation(inventory));
        setAlreadyLiked(false);
    }
    const handleLike = async () => {
        if(!alreadyLiked) {
            try {
                const response = await fetch('https://armory-api.onrender.com/api/test/'+ sessionStorage.getItem('userid'));
                const user = await response.json();
                user.like_count++;
                await fetch('https://armory-api.onrender.com/api/test/'+ sessionStorage.getItem('userid'), {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                });
            }
            catch(error) {
                console.error(error);
            }
            await outfitScoreChanger(indexes.top,indexes.bottom,indexes.shoes,true);
            setAlreadyLiked(true);
        }
    }
    const handleDislike = async () => {
        try {
            const response = await fetch('https://armory-api.onrender.com/api/test/'+ sessionStorage.getItem('userid'));
            const user = await response.json();
            user.dislike_count++;
            await fetch('https://armory-api.onrender.com/api/test/'+ sessionStorage.getItem('userid'), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
        }
        catch(error) {
            console.error(error);
        }
        await outfitScoreChanger(indexes.top,indexes.bottom,indexes.shoes,false);
        setAlreadyLiked(true);
        //window.location.reload(true);
    }
    const handleSave = async () => {
        try {
            const response = await fetch('https://armory-api.onrender.com/api/test/'+ sessionStorage.getItem('userid'));
            const user = await response.json();
            const newOutfit = [
                inventory[0][indexes.top],
                inventory[1][indexes.bottom],
                inventory[2][indexes.shoes]
            ];
            user.saved_outfits.push(newOutfit);
            const updateResponse = await fetch('https://armory-api.onrender.com/api/test/'+ sessionStorage.getItem('userid'), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
            const updatedUser = await updateResponse.json();
            console.log(updatedUser);
            setAlreadySaved(true);
        }
        catch (error) {
            console.error(error);
        }
        //window.location.reload(true);
    }
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
    const translateColor = (color) => {
        switch(color) {
            case 'pink': return '#FFB6C1';
            case 'lightBlue': return '#ADD8E6';
            case 'darkBlue': return '#00008B';
            case 'gray': return '#808080';
            case 'white': return '#FFFFFF';
            case 'black': return '#000000';
            case 'red': return '#E32636';
            case 'orange': return '#ED872D';
            case 'beige': return '#D2B48C';
            case 'yellow': return '#FFE135';
            case 'green': return '#03C03C';
            case 'purple': return '#9370DB';
            case 'brown': return '#987654';
            default: return '#FFFFFF';
        }
    }
    const tableStyle = {
        borderCollapse: 'collapse',
    };

    const cellStyle = {
        width: '150px',
        border: '2px solid black',
        padding: '8px',
        backgroundColor:'#ffffff'
    };
    const iconCellStyle = {
        width: '64px',
        border: '2px solid  black',
        padding: '8px',
    }
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
    if(!inventory) {
        return (
            <div className='page'>
                <div>
                    <Navbar/>
                    <p className='text'>Loading...</p>
                </div>
                <br/>
                <br/>
                <p> </p>
            </div>
        );
    }
    if(!(inventory[0] && inventory[1] && inventory[2])) {
        return (
            <div className='page'>
                <div>
                    <Navbar/>
                    <p className='text'>Please put at least one item in each category (top, bottom, shoes)</p>
                </div>
                <br/>
                <br/>
                <p> </p>
            </div>
        );
    }
    if(!inventory[0].length || !inventory[1].length || !inventory[2].length) {
        return (
            <div className='page'>
                <div>
                    <Navbar/>
                    <p className='text'>Please put at least one item in each category (top, bottom, shoes)</p>
                </div>
                <br/>
                <br/>
                <p> </p>
            </div>
        );
    }
    return (
        <div className='page'>
            <div>
                <Navbar/>
                <h1 className='text'>
                    Generator!
                </h1>
                <button onClick={handleGeneration}>Make me an outfit</button>
                <br/>
                <h2 className='text'>Outfit:</h2>
                {indexes && inventory &&
                    <div>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={cellStyle}>Name</th>
                                    <th style={cellStyle}>Type</th>
                                    <th style={cellStyle}>Color</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr key={inventory[0][indexes.top].title}>
                                    <td style={cellStyle}>{inventory[0][indexes.top].title}</td>
                                    <td style={cellStyle}>{translateType(inventory[0][indexes.top].clothing_type)}</td>
                                    <td style={cellStyle}>{inventory[0][indexes.top].color}</td>   
                                    <td style={{...iconCellStyle,backgroundColor:translateColor(inventory[0][indexes.top].color)}}>
                                        {(inventory[0][indexes.top].color == 'black' || inventory[0][indexes.top].color == 'darkBlue') && 
                                            <img style={{filter: 'invert()'}} src={`./ico_${inventory[0][indexes.top].clothing_type}.png`} alt={`Icon for clothing type ${inventory[0][indexes.top].clothing_type}`}/>
                                        }
                                        {(inventory[0][indexes.top].color != 'black' && inventory[0][indexes.top].color != 'darkBlue') && 
                                            <img src={`./ico_${inventory[0][indexes.top].clothing_type}.png`} alt={`Icon for clothing type ${inventory[0][indexes.top].clothing_type}`}/>
                                        }
                                    </td>                             
                                </tr>
                                <tr key={inventory[1][indexes.bottom].title}>
                                    <td style={cellStyle}>{inventory[1][indexes.bottom].title}</td>
                                    <td style={cellStyle}>{translateType(inventory[1][indexes.bottom].clothing_type)}</td>
                                    <td style={cellStyle}>{inventory[1][indexes.bottom].color}</td>   
                                    <td style={{...iconCellStyle,backgroundColor:translateColor(inventory[1][indexes.bottom].color)}}>
                                        {(inventory[1][indexes.bottom].color == 'black' || inventory[1][indexes.bottom].color == 'darkBlue') && 
                                            <img style={{filter: 'invert()'}} src={`./ico_${inventory[1][indexes.bottom].clothing_type}.png`} alt={`Icon for clothing type ${inventory[1][indexes.bottom].clothing_type}`}/>
                                        }
                                        {(inventory[1][indexes.bottom].color != 'black' && inventory[1][indexes.bottom].color != 'darkBlue') && 
                                            <img src={`./ico_${inventory[1][indexes.bottom].clothing_type}.png`} alt={`Icon for clothing type ${inventory[1][indexes.bottom].clothing_type}`}/>
                                        }
                                    </td>                             
                                </tr>
                                <tr key={inventory[2][indexes.shoes].title}>
                                    <td style={cellStyle}>{inventory[2][indexes.shoes].title}</td>
                                    <td style={cellStyle}>{translateType(inventory[2][indexes.shoes].clothing_type)}</td>
                                    <td style={cellStyle}>{inventory[2][indexes.shoes].color}</td>       
                                    <td style={{...iconCellStyle,backgroundColor:translateColor(inventory[2][indexes.shoes].color)}}>
                                        {(inventory[2][indexes.shoes].color == 'black' || inventory[2][indexes.shoes].color == 'darkBlue') && 
                                            <img style={{filter: 'invert()'}} src={`./ico_${inventory[2][indexes.shoes].clothing_type}.png`} alt={`Icon for clothing type ${inventory[2][indexes.shoes].clothing_type}`}/>
                                        }
                                        {(inventory[2][indexes.shoes].color != 'black' && inventory[2][indexes.shoes].color != 'darkBlue') && 
                                            <img src={`./ico_${inventory[2][indexes.shoes].clothing_type}.png`} alt={`Icon for clothing type ${inventory[2][indexes.shoes].clothing_type}`}/>
                                        }
                                        {/*<img src={`./ico_${inventory[2][indexes.shoes].clothing_type}.png`} alt={`Icon for clothing type ${inventory[2][indexes.shoes].clothing_type}`}/>*/}
                                    </td>                         
                                </tr>
                            </tbody>
                        </table>
                        {!alreadyLiked && <div><button onClick={handleLike}>I like this outfit</button><br/></div>}
                        {!alreadyLiked && <div><button onClick={handleDislike}>I don't like this outfit</button><br/></div>}
                        {!alreadySaved && <div><button onClick={handleSave}>Save Outfit</button><br/></div>}
                    </div>
                }
            </div>
            <br/>
            <br/>
            <p> </p>
        </div>
    );
}

export default Generator;