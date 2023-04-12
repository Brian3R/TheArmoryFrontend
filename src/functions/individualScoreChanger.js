

async function individualScoreChanger (index, bodyRegion, isLiked){
    const response = await fetch('https://thearmory-api.onrender.com/api/test/' + sessionStorage.getItem('userid'));
    const user = await response.json();
    console.log(user);
    console.log(user.inventory[bodyRegion][index].favorability);
    if (isLiked){
        if (user.inventory[bodyRegion][index].favorability < 10) { 
            user.inventory[bodyRegion][index].favorability++;
        }
    }
    if (!isLiked){
        if (user.inventory[bodyRegion][index].favorability > 1) {
            user.inventory[bodyRegion][index].favorability--;
        }
    }
    console.log(user);
    console.log(user.inventory[bodyRegion][index].favorability);

    


    const updateResponse = await fetch('https://thearmory-api.onrender.com/api/test/' + sessionStorage.getItem('userid'), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });
    console.log(response.status);
    const updatedUser = await updateResponse.json();
    console.log(updatedUser);
}

export default individualScoreChanger;