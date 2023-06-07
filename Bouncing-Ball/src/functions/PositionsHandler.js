
const getInitialBallPosition = (currentBoard) => {
    let ballPosition = [];
    for (let r = 0; r < currentBoard.length; r++) {
      for (let c = 0; c < currentBoard[0].length; c++) {
        if (currentBoard[r][c] === "1") {
          ballPosition.push(r, c);
          break;
        }
      }
    }
    return ballPosition;
  };
  const getCurrentBallPosition=(prevBallPos,currentDir)=>{
    const [prevPosRow, prevPosCol] = prevBallPos;
    const newPosRow = prevPosRow + currentDir.direction[0];
    const newPosCol = prevPosCol + currentDir.direction[1];
    return [newPosRow, newPosCol];
  }

  const getNeighboursPositions = (currentDir,currentBalPos,currentBoard) => {
    let NeighbourProps = [];
    for (const neighbour in currentDir) {
      let rowPos = currentBalPos[0] + currentDir[neighbour][0];
      let colPos = currentBalPos[1] + currentDir[neighbour][1];
      NeighbourProps.push(currentBoard[rowPos][colPos]);
    }
    return NeighbourProps;
  };
  const getPortalPosition=(currBallPos,currentDir)=>{
    const [prevPosRow, prevPosCol] = currBallPos;
    const newPortalRow = prevPosRow + currentDir.direction[0];
    const newPortalCol = prevPosCol + currentDir.direction[1];
    return [newPortalRow, newPortalCol];
  }
export default {getInitialBallPosition,getCurrentBallPosition,getNeighboursPositions,getPortalPosition}