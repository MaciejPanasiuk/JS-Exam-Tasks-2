
const UPLEFT = {
  leftNeighbour: [0, -1],
  direction: [-1, -1],
  rightNeighbour: [-1, 0],
};
const UPRIGHT = {
  leftNeighbour: [-1, 0],
  direction: [-1, 1],
  rightNeighbour: [0, 1],
};
const DOWNRIGHT = {
  leftNeighbour: [0, 1],
  direction: [1, 1],
  rightNeighbour: [1, 0],
};
const DOWNLEFT = {
  leftNeighbour: [1, 0],
  direction: [1, -1],
  rightNeighbour: [0, -1],
};
const POSSIBLEDIRECTIONS = [
  [-1, -1],//upLeft
  [-1, 1],//UPRIGHT
  [1, 1],//DOWNRIGHT
  [1, -1],//DOWNLEFT
];
export default { UPLEFT, UPRIGHT, DOWNRIGHT, DOWNLEFT, POSSIBLEDIRECTIONS };
