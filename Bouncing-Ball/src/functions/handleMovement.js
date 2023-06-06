
const updateBoardOnMove=(previousBoard,ballPos,currentDir)=>{
    const BoardCopy = JSON.parse(JSON.stringify(previousBoard));
    const [currPosRow, currPosCol] = ballPos;
    const newPosRow = currPosRow + currentDir.direction[0];
    const newPosCol = currPosCol + currentDir.direction[1];
    BoardCopy[currPosRow][currPosCol] = "0";
    BoardCopy[newPosRow][newPosCol] = "1";
    return BoardCopy;
}
const updateBoardOnPortalEnter=(previousBoard,portalPos,ballPos,currentDir)=>{
    const BoardCopy = JSON.parse(JSON.stringify(previousBoard));
    const [portalPosRow, portalPosCol] = portalPos;
    const [ballPosRow, ballPosCol] = ballPos;
    const newPosRow = ballPosRow + currentDir.direction[0];
    const newPosCol = ballPosCol + currentDir.direction[1];
    BoardCopy[portalPosRow][portalPosCol] = "X";
    BoardCopy[newPosRow][newPosCol] = "1";
    return BoardCopy;
}

export default {updateBoardOnMove,updateBoardOnPortalEnter}