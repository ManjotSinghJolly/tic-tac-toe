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
    for (let turn = 1; turn <= 9; turn++) {
      if (turn % 2 !== 0) {
        console.log(`It is ${firstPlayer.name}'s turn.`);
        movePosition = prompt("Enter a square number: ");
        movePosition = Number(movePosition);
        const { rowIndex, columnIndex } = this.makeIndex(movePosition);
        Gameboard.boardArray[rowIndex][columnIndex] = firstPlayer.marker;
        console.log(Gameboard.boardArray);
        const winner = this.checkWinner(Gameboard.boardArray);
        if (winner) {
          if (winner === "draw") {
            console.log("It's a draw!");
            break;
          } else {
            console.log("The winner is: " + winner);
            break;
          }
        } else {
          console.log("No winner yet.");
        }
      } else if (turn % 2 === 0) {
        console.log(`It is ${secondPlayer.name}'s turn.`);
        movePosition = prompt("Enter a square number: ");
        movePosition = Number(movePosition);
        const { rowIndex, columnIndex } = this.makeIndex(movePosition);
        Gameboard.boardArray[rowIndex][columnIndex] = secondPlayer.marker;
        console.log(Gameboard.boardArray);
        const winner = this.checkWinner(Gameboard.boardArray);
        if (winner) {
          if (winner === "draw") {
            console.log("It's a draw!");
            break;
          } else {
            console.log("The winner is: " + winner);
            break;
          }
        } else {
          console.log("No winner yet.");
        }
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
  //3. checking for a winner
  checkWinner(board) {
    // Checking for a winning combination in the rows
    for (let row = 0; row <= 2; row++) {
      if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
        // Returning the marker of the winning player
        return board[row][0];
      }
    }

    // Checking for a winning combination in the columns
    for (let col = 0; col <= 2; col++) {
      if (board[col][0] === board[col][0] && board[col][1] === board[col][2]) {
        // Returning the marker of the winning player
        return board[col][0];
      }
    }

    // Checking for a winning combination in the diagonals
    if (
      (board[0][0] === board[1][1] && board[1][1] === board[2][2]) ||
      (board[0][2] === board[1][1] && board[1][1] === board[2][0])
    ) {
      // Returning the center element which is common in both the diagonals and is the marker of the winning player
      if (board[1][1] !== null) {
        return board[1][1];
      }
    }

    // Checking if there is a draw;
    let isDraw = true;
    for (let row = 0; row <= 2; row++) {
      for (let col = 0; col <= 2; col++) {
        if (board[row][col] === null) {
          isDraw = false;
          break;
        }
      }
    }

    if (isDraw) {
      console.log("It is a draw");
    }

    return null;
  },

  //4. updating the gameboard after each move
  //5. ending the game when a winner is found or the game ends in a draw
};

// To test the console version of the game:
// Making "instances" of our objects

// GameControl.startGame();

// Calling the functions for testing
GameControl.startGame();
GameControl.getPlayerMove();
