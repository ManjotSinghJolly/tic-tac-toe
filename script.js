// Making the gameboard object
const Gameboard = {
  //properties and methods to represent and manipulate the gameboard
  boardArray: [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ],
};

// Constructor function to make the player objects
function Player(name, marker) {
  this.name = name;
  this.marker = marker;
}

// Making the game control object
const GameControl = {
  firstPlayer: null,
  secondPlayer: null,
  // 1. starting the game
  startGame() {
    let playerOne = prompt("Enter the name of the player 'X': ");
    let playerTwo = prompt("Enter the name of the player 'O': ");
    firstPlayer = new Player(playerOne, "X");
    secondPlayer = new Player(playerTwo, "O");
    console.log(firstPlayer);
    console.log(secondPlayer);
  },
  //2. determining whose turn it is
  getPlayerMove() {
    let movePosition;
    for (let turn = 1; turn <= 3; turn++) {
      if (turn % 2 !== 0) {
        console.log(`It is ${firstPlayer.name}'s turn.`);
        movePosition = prompt("Enter a square number: ");
        movePosition = Number(movePosition);
        const { rowIndex, columnIndex } = this.makeIndex(movePosition);
        Gameboard.boardArray[rowIndex][columnIndex] = firstPlayer.marker;
        console.log(Gameboard.boardArray);
      } else if (turn % 2 === 0) {
        console.log(`It is ${secondPlayer.name}'s turn.`);
        movePosition = prompt("Enter a square number: ");
        movePosition = Number(movePosition);
        const { rowIndex, columnIndex } = this.makeIndex(movePosition);
        Gameboard.boardArray[rowIndex][columnIndex] = secondPlayer.marker;
        console.log(Gameboard.boardArray);
      }
    }
  },
  // Function to convert the number entered into an array index
  makeIndex(squareNumber) {
    let rowIndex;
    let columnIndex;
    if (squareNumber >= 1 && squareNumber <= 3) {
      rowIndex = 0;
      columnIndex = squareNumber - 1;
    } else if (squareNumber >= 4 && squareNumber <= 6) {
      rowIndex = 1;
      columnIndex = squareNumber - 4;
    } else if (squareNumber >= 7 && squareNumber <= 9) {
      rowIndex = 2;
      columnIndex = squareNumber - 7;
    }
    return { rowIndex, columnIndex };
  },
};

//3. checking for a winner
//4. updating the gameboard after each move
//5. ending the game when a winner is found or the game ends in a draw

// To test the console version of the game:
// Making "instances" of our objects

// GameControl.startGame();

GameControl.startGame();
GameControl.getPlayerMove();
