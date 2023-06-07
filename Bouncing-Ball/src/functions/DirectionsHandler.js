import isEqual from 'lodash/isEqual';
import directions from "../const/directions.js";
const { UPLEFT, UPRIGHT, DOWNRIGHT, DOWNLEFT, POSSIBLEDIRECTIONS } = directions;

const setDirection = (dirArray) => {
  switch (true) {
    case isEqual(dirArray, UPLEFT.direction):
      return UPLEFT;
    case isEqual(dirArray, UPRIGHT.direction):
      return UPRIGHT;
    case isEqual(dirArray, DOWNRIGHT.direction):
      return DOWNRIGHT;
    case isEqual(dirArray, DOWNLEFT.direction):
      return DOWNLEFT;
  }
};

const getRandomDirection = (currentDirection) => {
  let randomDirection =
    POSSIBLEDIRECTIONS[Math.floor(Math.random() * POSSIBLEDIRECTIONS.length)];
  if (isEqual(currentDirection, randomDirection)) {
    console.log(`reroll`);
    return getRandomDirection(currentDirection);
  } else {
    return setDirection(randomDirection);
  }
};

const changeDirOnWallHit = (currentDirection, neighbours) => {
    let newDirection;
    const currentDirIndex = POSSIBLEDIRECTIONS.findIndex((dir) =>
      isEqual(dir, currentDirection)
    );
    if (neighbours[0] === "X" && neighbours[1] === "X" && neighbours[2] === "X") {
      newDirection = currentDirection.map((coordinate) => coordinate * -1);
    } else if (
      neighbours[0] === "0" &&
      neighbours[1] === "X" &&
      neighbours[2] === "0"
    ) {
      let bothSides = [];
      if (currentDirIndex + 1 >= POSSIBLEDIRECTIONS.length) {
        bothSides.push(
          POSSIBLEDIRECTIONS[0],
          POSSIBLEDIRECTIONS[currentDirIndex - 1]
        );
      } else if (currentDirIndex - 1 < 0) {
        bothSides.push(
          POSSIBLEDIRECTIONS[POSSIBLEDIRECTIONS.length - 1],
          POSSIBLEDIRECTIONS[currentDirIndex + 1]
        );
      } else {
        bothSides.push(
          POSSIBLEDIRECTIONS[currentDirIndex - 1],
          POSSIBLEDIRECTIONS[currentDirIndex + 1]
        );
      }
      newDirection = bothSides[Math.floor(Math.random() * bothSides.length)];
    } else if (
      neighbours[0] === "X" &&
      neighbours[1] === "X" &&
      neighbours[2] === "0"
    ) {
      if (currentDirIndex + 1 >= POSSIBLEDIRECTIONS.length) {
        newDirection = POSSIBLEDIRECTIONS[0];
      } else {
        newDirection = POSSIBLEDIRECTIONS[currentDirIndex + 1];
      }
    } else if (
      neighbours[0] === "0" &&
      neighbours[1] === "X" &&
      neighbours[2] === "X"
    ) {
      if (currentDirIndex - 1 < 0) {
        newDirection = POSSIBLEDIRECTIONS[POSSIBLEDIRECTIONS.length - 1];
      } else {
        newDirection = POSSIBLEDIRECTIONS[currentDirIndex - 1];
      }
    }
    return setDirection(newDirection);
  };

export default { setDirection, getRandomDirection,changeDirOnWallHit };
