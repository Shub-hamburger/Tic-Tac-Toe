// DOM elements
const boxes = document.querySelectorAll(".box");
const heading = document.querySelector("#heading");
const winner = document.querySelector(".winner");
const restartBtn = document.querySelector("#restart");
const turn = document.querySelector(".turn");

let isXTurn = true;
const WINNING_PATTERN = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// start the game
const startGame = () => {
  isXTurn = true;
  turn.textContent = `${isXTurn ? "X" : "O"}'s turn`;
  boxes.forEach((box) => {
    box.textContent = "";
    box.removeEventListener("click", handleClick);
    box.addEventListener("click", handleClick);
  });
  winner.textContent = "";
  winner.classList.remove(".show");
};

// end the game
const endGame = (isDraw) => {
  if (isDraw) {
    winner.textContent = "It's a draw!";
  } else {
    winner.textContent = `${isXTurn ? "X" : "O"} won`;
  }
  winner.classList.add(".show");
  boxes.forEach((box) => {
    box.removeEventListener("click", handleClick);
  });
};

// change turns
const changeTurn = () => (isXTurn = !isXTurn);

// Check for win
const checkWin = (turn) => {
  return WINNING_PATTERN.some((pattern) => {
    return pattern.every((index) => {
      return boxes[index].textContent === turn;
    });
  });
};

// check for draw
const isDraw = () => {
  return [...boxes].every((box) => {
    return box.textContent === "X" || box.textContent === "O";
  });
};

// handle click on box
const handleClick = (event) => {
  const currTurn = isXTurn ? "X" : "O";
  turn.textContent = `${!isXTurn ? "X" : "O"}'s turn`;
  event.target.textContent = currTurn;
  if (checkWin(currTurn)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    changeTurn();
  }
};

// event listeners
restartBtn.addEventListener("click", startGame);

// start game on load
startGame();
