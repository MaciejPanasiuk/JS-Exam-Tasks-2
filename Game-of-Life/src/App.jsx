import { useCallback, useEffect, useState, useRef } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import NEIGHBOURS from "./Common/const";
import createEmptyTileset from "./Common/functions";
import "./App.css";

function App() {
  const [isRunning, setisRunning] = useState(false);
  const [numOfRows, setNumOfRows] = useState(30);
  const [numOfCols, setNumOfCols] = useState(50);
  const [tileset, setTileset] = useState(() => {
    return createEmptyTileset(numOfRows, numOfCols);
  });
  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;

  useEffect(() => {
    setTileset(createEmptyTileset(numOfRows, numOfCols));
  }, [numOfRows, numOfCols]);

  useEffect(() => {
    setTimeout(runGeneration, 200);
  }, [isRunning, tileset]);

  const runGeneration = useCallback(() => { // optymalizacja rerenderingu przy wielokrotnych zmianach stanu
    if (!isRunningRef.current) {
      return;
    }
    setTileset((baseTileset) => {
      const tilesetDeepCopy = JSON.parse(JSON.stringify(baseTileset));
      for (let x = 0; x < numOfRows; x++) {
        for (let y = 0; y < numOfCols; y++) {
          const neighboursCount = countNeighbours(x, y, baseTileset);
          if (neighboursCount < 2 || neighboursCount > 3) {
            tilesetDeepCopy[x][y] = false;
          } else if (!baseTileset[x][y] && neighboursCount === 3) {
            tilesetDeepCopy[x][y] = true;
          }
        }
      }
      return tilesetDeepCopy;
    });
  }, []);

  const countNeighbours = (Xdim, Ydim, inputTileset) => {
    let aliveNeighbours = 0;
    for (const neighbour of NEIGHBOURS) {
      let NeighbourXdim = Xdim + neighbour.x;
      let NeighbourYdim = Ydim + neighbour.y;
      if (
        NeighbourXdim >= 0 &&
        NeighbourXdim < numOfRows &&
        NeighbourYdim >= 0 &&
        NeighbourYdim < numOfCols
      ) {
        if (inputTileset[NeighbourXdim][NeighbourYdim]) {
          aliveNeighbours++;
        }
      }
    }
    return aliveNeighbours;
  };
  const changeTile = (Xdim, Ydim) => {
    const updatedTileset=JSON.parse(JSON.stringify(tileset))//deep copy, shallow doesnt work with nested stuff
    updatedTileset[Xdim][Ydim]=!tileset[Xdim][Ydim]
    setTileset(updatedTileset);
  };
  const handleColumnsChange = (event) => {
    setNumOfCols(event.target.value);
  };

  const handleRowsChange = (event) => {
    setNumOfRows(event.target.value);
  };
  const handleStartButton = () => {
    setisRunning(!isRunning);
    if (!isRunning) {
      console.log("started");
      isRunningRef.current = true;
      runGeneration();
    }
  };

  const randomizeTileset = () => {
    const newTileset = createEmptyTileset(numOfRows, numOfCols);
    for (let x = 0; x < numOfRows; x++) {
      for (let y = 0; y < numOfCols; y++) {
        newTileset[x][y] = Math.random() > 0.8 ? true : false;
      }
    }
    setTileset(newTileset);
  };
  const clearTileset = () => {
    setisRunning(false);
    setTileset(createEmptyTileset(numOfRows, numOfCols));
  };
  return (
    <>
      <header>
        <h1>GAME OF LIFE</h1>
      </header>
      <h2>Options:</h2>
      <div className="Options">
        <TextField
          key="ColsNum"
          label="Number of Columns"
          variant="filled"
          type="number"
          InputProps={{ inputProps: { min: 0, step: 5, max: 100 } }}
          value={numOfCols}
          onChange={handleColumnsChange}
        />
        <TextField
          key="RowsNum"
          variant="filled"
          type="number"
          InputProps={{ inputProps: { min: 0, step: 5, max: 100 } }}
          label="Number of Rows"
          value={numOfRows}
          onChange={handleRowsChange}
        />
        <Button variant="contained" size="large" onClick={randomizeTileset}>
          Randomize
        </Button>
        <Button variant="contained" size="large" onClick={clearTileset}>
          CLEAR
        </Button>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            handleStartButton();
          }}
        >
          {!isRunning ? "START" : "STOP"}
        </Button>
      </div>
      <div className="tileset">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${numOfCols},20px)`,
          }}
        >
          {tileset.map((rows, x) =>
            rows.map((cols, y) => (
              <div
                onClick={() => {
                  changeTile(x, y);
                }}
                key={`Tile ${x},${y}`}
                className={tileset[x][y] ? "tile alive" : "tile"}
              ></div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default App;
