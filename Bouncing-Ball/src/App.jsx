import { useCallback, useEffect, useRef, useState } from "react";
import INPUTBOARD from "./const/ExamInput.js";
import DirectionsHandler from "./functions/DirectionsHandler.js";
import PositionsHandler from "./functions/PositionsHandler.js";
import MovementHandler from "./functions/MovementHandler.js";
import Button from "@mui/material/Button";

import "./App.css";
const { setDirection, getRandomDirection, changeDirOnWallHit } =
DirectionsHandler;
const {
  getInitialBallPosition,
  getCurrentBallPosition,
  getNeighboursPositions,
  getPortalPosition,
} = PositionsHandler;
const { updateBoardOnMove, updateBoardOnPortalEnter } = MovementHandler;

function App() {

  const [board, setBoard] = useState(INPUTBOARD);
  const [ballPosition, setballPosition] = useState(() =>
    getInitialBallPosition(board)
  );
  const [currentDirection, setCurrentDirection] = useState(() =>
    setDirection([1, 1])
  );
  const [isRunning, setIsRunning] = useState(false);
  const [wallHitTrigger, setWallHitTrigger] = useState(false);
  const [portalPosition, setPortalPosition] = useState([]);
  const RunningRef = useRef(isRunning);
  RunningRef.current = isRunning;

  useEffect(() => {
    if (portalPosition.length > 0) {
      iTurnedIntoABrickMorty();
    }
  }, [portalPosition]);

  useEffect(() => {
    runGame();
  }, [wallHitTrigger]);

  useEffect(() => {
    const timer = setTimeout(runGame, 150);
    return () => clearTimeout(timer);
  }, [isRunning, ballPosition, currentDirection]);

  const runGame = useCallback(() => {
    if (!RunningRef.current) {
      return;
    }
    const currentNeighbours = getNeighboursPositions(
      currentDirection,
      ballPosition,
      board
    );
    const newPositionSymbol = currentNeighbours[1];
    if (newPositionSymbol === "0") {
      moveBall();
    } else if (newPositionSymbol === "X") {
      handleBouncingFromWall();
      setWallHitTrigger((wallHitTrigger) => !wallHitTrigger);
    } else if (newPositionSymbol === "Y") {
      handlePortal();
      moveBall();
    } else {
      console.log(`error we got ${newPositionSymbol} ahead`);
    }
  },[board,currentDirection,ballPosition]);

  const moveBall = useCallback(() => {
    setBoard((previousBoard) =>
    updateBoardOnMove(previousBoard, ballPosition, currentDirection)
    );
    setballPosition((prevBallPosition) =>
      getCurrentBallPosition(prevBallPosition, currentDirection)
    );
  },[board,ballPosition,currentDirection]);

  const iTurnedIntoABrickMorty = () => {
    setBoard((previousBoard) =>
    updateBoardOnPortalEnter(
        previousBoard,
        portalPosition,
        ballPosition,
        currentDirection
      )
    );
    setballPosition((prevBallPosition) =>
      getCurrentBallPosition(prevBallPosition, currentDirection)
    );
  };

  const handleBouncingFromWall = useCallback(() => {
    const currentNeighbours = getNeighboursPositions(
      currentDirection,
      ballPosition,
      board
    );
    setCurrentDirection((prevDirection) =>
      changeDirOnWallHit(prevDirection.direction, currentNeighbours)
    );
  },[currentDirection,ballPosition,board]);

  const handlePortal = () => {
    setCurrentDirection((prevDirection) =>
      getRandomDirection(prevDirection.direction)
    );
    setPortalPosition(() => getPortalPosition(ballPosition, currentDirection));
  };

  const handleStartButton = useCallback(() => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  },[]);

  const handleClearButton = useCallback(() => {
    setIsRunning(false);
    setballPosition([1, 1]);
    setCurrentDirection(() => setDirection([1, 1]));
    setBoard(INPUTBOARD);
    setPortalPosition([]);
  },[]);

  return (
    <>
      {" "}
      <header>
        <h1>BOUNCE BALL</h1>
      </header>
      <div className="Controls">
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            handleStartButton();
          }}
        >
          {!isRunning ? "START" : "STOP"}
        </Button>
        <Button variant="contained" size="large" onClick={handleClearButton}>
          CLEAR
        </Button>
      </div>
        <div
        className="Board"
          style={{gridTemplateColumns: `repeat(${board[0].length},30px)`}}
        >
          {board.map((rows, x) =>
            rows.map((cols, y) =>
              board[x][y] === "X" ? (
                <div key={`Tile ${x},${y}`} className="tile wall"></div>
              ) : board[x][y] === "1" ? (
                <div key={`Tile ${x},${y}`} className="tile">
                  <div className="ball"></div>
                </div>
              ) : board[x][y] === "Y" ? (
                <div key={`Tile ${x},${y}`} className="tile portal"></div>
              ) : (
                <div key={`Tile ${x},${y}`} className="tile"></div>
              )
            )
          )}
        </div>
    </>
  );
}

export default App;
