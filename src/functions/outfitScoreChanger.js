import individualScoreChanger from './individualScoreChanger';

async function outfitScoreChanger (index1, index2, index3, isLiked){
    await individualScoreChanger (index1, 0, isLiked);
    await individualScoreChanger (index2, 1, isLiked);
    await individualScoreChanger (index3, 2, isLiked);
}

export default outfitScoreChanger;