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
  turn: 1,
  winner: null,
  firstPlayer: null,
  secondPlayer: null,
  // 1. starting the game
  startGame() {
    // let playerOne = prompt("Enter the name of the player 'X': ");
    // let playerTwo = prompt("Enter the name of the player 'O': ");
    // firstPlayer = new Player(playerOne, "X");
    // secondPlayer = new Player(playerTwo, "O");
    // console.log(firstPlayer);
    // console.log(secondPlayer);

    const dialog = document.querySelector("dialog");
    dialog.showModal();
    const form = document.getElementById("player-form");
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      //Storing the values entered in the form fields in variables
      const playerXname = document.getElementById("player-x").value;
      const playerOname = document.getElementById("player-o").value;

      // Making "Player" objects with the supplied names
      firstPlayer = new Player(playerXname, "X");
      secondPlayer = new Player(playerOname, "O");
      console.log(firstPlayer);
      console.log(secondPlayer);

      // Resetting the form and closing the dialog box when the form is submitted
      form.reset();
      dialog.close();

      displayController.setInnerHTML(firstPlayer);
    });
  },
  //2. determining whose turn it is
  getPlayerMove(rowIndex, colIndex, turn) {
    if (GameControl.turn % 2 !== 0) {
      Gameboard.boardArray[rowIndex][colIndex] = firstPlayer.marker;
      // turnStatus.innerHTML = `X: ${firstPlayer.name}'s turn`;
      turn++;
      console.log(Gameboard.boardArray);
    } else {
      Gameboard.boardArray[rowIndex][colIndex] = secondPlayer.marker;
      // turnStatus.innerHTML = `O: ${secondPlayer.name}'s turn`;
      turn++;
      console.log(Gameboard.boardArray);
    }
    GameControl.turn++;
    winner = this.checkWinner(Gameboard.boardArray);

    if (winner) {
      if (winner === "draw") {
        console.log("It's a draw!");
      } else {
        console.log("The winner is: " + winner);
      }
    } else {
      console.log("No winner yet.");
    }

    // REAL CODE STARTS HERE
    // let movePosition;
    // let winner = null; // Initialize winner variable outside the loop
    // let turnStatus = document.getElementById("turn-status");
    // for (let turn = 1; turn <= 9; turn++) {
    //   if (turn % 2 !== 0) {
    //     console.log(`It is ${firstPlayer.name}'s turn.`);
    //     turnStatus.innerHTML = `It is ${firstPlayer.name}'s turn.`;
    //   } else {
    //     console.log(`It is ${secondPlayer.name}'s turn.`);
    //     turnStatus.innerHTML = `It is ${secondPlayer.name}'s turn.`;
    //   }

    //   let rowIndex, columnIndex;

    //   do {
    //     movePosition = prompt("Enter a square number: ");
    //     movePosition = Number(movePosition);
    //     const indexes = this.makeIndex(movePosition);
    //     rowIndex = indexes.rowIndex;
    //     columnIndex = indexes.columnIndex;

    //     if (Gameboard.boardArray[rowIndex][columnIndex] !== null) {
    //       console.log(
    //         "That square is already occupied. Please choose another square."
    //       );
    //     }
    //   } while (Gameboard.boardArray[rowIndex][columnIndex] !== null);

    //   if (turn % 2 !== 0) {
    //     Gameboard.boardArray[rowIndex][columnIndex] = firstPlayer.marker;
    //   } else {
    //     Gameboard.boardArray[rowIndex][columnIndex] = secondPlayer.marker;
    //   }
    //   console.log(Gameboard.boardArray);
    //   winner = this.checkWinner(Gameboard.boardArray);
    //   if (winner) {
    //     break; // Exit the loop if a winner or draw is found
    //   }
    // }

    // // After the loop completes
    // if (winner) {
    //   if (winner === "draw") {
    //     console.log("It's a draw!");
    //   } else {
    //     console.log("The winner is: " + winner);
    //   }
    // } else {
    //   console.log("No winner yet.");
    // }
    //REAL CODE ENDS HERE
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
      if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
        // Returning the marker of the winning player
        return board[0][col];
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

// Making the object to handle the display logic
const displayController = {
  // Function to render the 2-D array to the webpage
  turnStatus: document.getElementById("turn-status"),
  setInnerHTML(firstPlayer) {
    this.turnStatus.innerHTML = `X: ${firstPlayer.name}'s turn`;
  },

  renderBoard() {
    const body = document.body;
    const cellContainer = document.createElement("div");
    cellContainer.classList.add("cellContainer");

    for (let rowNumber = 0; rowNumber < 3; rowNumber++) {
      for (let colNumber = 0; colNumber < 3; colNumber++) {
        //creating a div HTML element called cell
        const cell = document.createElement("div");

        //setting the row and column data attributes of each cell
        cell.setAttribute("data-row", rowNumber);
        cell.setAttribute("data-col", colNumber);

        // setting its css class
        cell.classList.add("cell");

        // Adding click event listener to each cell
        cell.addEventListener(
          "click",
          function () {
            winningCondition = GameControl.checkWinner(Gameboard.boardArray);
            if (winningCondition) {
              return;
            } else {
              displayController.enterMarker(cell);
            }

            displayController.updateIndicator(GameControl.turn);

            // let turnStatus = document.getElementById("turn-status");
            // turnStatus.innerHTML = `X: ${firstPlayer.name}'s turn`;

            // if (GameControl.turn % 2 !== 0) {
            //   turnStatus.innerHTML = `X: ${firstPlayer.name}'s turn`;
            // } else if (GameControl.turn % 2 === 0) {
            //   turnStatus.innerHTML = `O: ${secondPlayer.name}'s turn`;
            // }
          },
          {
            once: true,
          }
        );

        cellContainer.appendChild(cell);

        //adding the div element to the body
        body.appendChild(cellContainer);
      }
    }
  },

  enterMarker(cell) {
    if (cell) {
      // console.log(cell.getAttribute("data-row"), cell.getAttribute("data-col"));
      let rowCoord = cell.getAttribute("data-row");
      let colCoord = cell.getAttribute("data-col");

      GameControl.getPlayerMove(rowCoord, colCoord);
      cell.innerHTML = Gameboard.boardArray[rowCoord][colCoord];
    }
  },

  updateIndicator(turn) {
    // displayController.turnStatus.innerHTML = `X: ${firstPlayer.name}'s turn`;
    if (turn % 2 !== 0) {
      displayController.turnStatus.innerHTML = `X: ${firstPlayer.name}'s turn`;
    } else if (turn % 2 === 0) {
      displayController.turnStatus.innerHTML = `O: ${secondPlayer.name}'s turn`;
    }
  },
};

// Calling the functions for testing
GameControl.startGame();
// GameControl.getPlayerMove();
displayController.renderBoard();
displayController.enterMarker();
