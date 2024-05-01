console.clear();
function createBoard(size) {
  let board = [];
  let count = 1;
  for (let outer = 0; outer < size; outer++) {
    let row = [];
    for (let inner = 0; inner < size; inner++) {
      row.push(count);
      count++;
    }
    board.push(row);
  }
  return board;
}
function checkRow(board, row) {
  for (let col = 1; col < board.length; col++) {
    if (board[row][col] !== board[row][0]) {
      return false;
    }
  }
  return true;
}

function checkCol(board, col) {
  for (let row = 1; row < board.length; row++) {
    if (board[row][col] !== board[0][col]) {
      return false;
    }
  }
  return true;
}
function checkStartDiag(board) {
  for (let index = 0; index < board.length; index++) {
    if (board[index][index] !== board[0][0]) {
      return false;
    }
  }
  return true;
}

function checkEndDiag(board) {
  for (let index = 0; index < board.length; index++) {
    if (board[index][board.length - 1 - index] !== board[0][board.length - 1]) {
      return false;
    }
  }
  return true;
}

function checkBoard(board) {
  for (let index = 0; index < board.length; index++) {
    if (checkRow(board, index) || checkCol(board, index)) {
      return true;
    }
  }
  return checkStartDiag(board) || checkEndDiag(board);
}

function checkPosInvalid(board, pos) {
  return isNaN(
    parseInt(
      board[Math.floor((pos - 1) / board.length)][(pos - 1) % board.length]
    )
  );
}

function updateBoard(board, pos, piece) {
  board[Math.floor((pos - 1) / board.length)][(pos - 1) % board.length] = piece;
}

function printBoard(board) {
  for (let row of board) {
    let temp = "";
    for (let col of row) {
      temp += ` ${col} `;
    }
    console.log(temp);
  }
}

function getBoardSize() {
  let input = "";
  do {
    input = parseInt(prompt("Enter board size"));
  } while (isNaN(input) || input <= 0);
  return input;
}

function startGame(playerX, playerO) {
  let size = getBoardSize();
  let board = createBoard(size);
  console.clear();
  printBoard(board);
  for (let index = 0; index < size * size; index++) {
    let piece = index % 2 == 0 ? "X" : "O";
    let pos = -1;
    do {
      pos = parseInt(
        prompt(
          `${piece === "X" ? playerX : playerO} enter position for ${piece}`
        )
      );
    } while (isNaN(pos) || checkPosInvalid(board, pos));
    updateBoard(board, pos, piece);
    console.clear();
    printBoard(board);
    if (checkBoard(board)) {
      return `${piece === "X" ? playerX : playerO} won`;
    }
  }
  return "Draw";
}
function getName(player) {
  return prompt(`${player} player please enter your name`);
}

function getPiece(name) {
  let input = "";
  do {
    input = prompt(`${name} please choose your piece`);
  } while (input !== "X" && input !== "O");
  return input;
}

function displayStats(results, player1, player2) {
  let player1Wins = 0;
  let player2Wins = 0;
  let draws = 0;
  for (let index = 0; index < results.length; index++) {
    let result = results[index];
    switch (result) {
      case `${player1} won`:
        player1Wins++;
        break;
      case `${player2} won`:
        player2Wins++;
        break;
      default:
        draws++;
    }
    console.log(`Game ${index + 1}: ${result}`);
  }
  console.log(`${player1} wins: ${player1Wins}`);
  console.log(`${player2} wins: ${player2Wins}`);
  console.log(`Draws: ${draws}`);
}

const player1 = getName("First");
const player2 = getName("Second");
let results = [];
let playing = true;
do {
  let player1Piece = getPiece(player1);
  let result = startGame(
    player1Piece === "X" ? player1 : player2,
    player1Piece === "O" ? player1 : player2
  );
  console.log(result);
  results.push(result);
  playing =
    prompt("Do you want to play another game? Y or N").toUpperCase() === "Y";
} while (playing);
displayStats(results, player1, player2);
