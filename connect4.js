"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
const board = []; // array of rows, each row is array of cells  (board[y][x])
// (board[5][0] would be the bottom-left spot on the board)

/** makeBoard: fill in global `board`:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // set "board" to empty HEIGHT x WIDTH matrix array
  // init an array called row
  // push null - width
  // push row - board six times = height

  for (let y = 0; y < HEIGHT; y++) {
    const row = [];

    for (let x = 0; x < WIDTH; x++) {
      row.push(null);
    }

    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById("board");

  /** creating a top row for all the clickable cells */
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");

  //individual cells for user to click on to choose to drop pieces
  // appends to the top row

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");

    headCell.setAttribute("id", `top-${x}`);
    headCell.addEventListener("click", handleClick);
    top.append(headCell);
  }

  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    //Create a table row element and assign to a "row" variable

    const row = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      //Create a table cell element and assign to a "cell" variable

      const cell = document.createElement("td");
      // add an id, c-y-x, to the above table cell element
      // (for example, for the cell at y=2, x=3, the ID should be "c-2-3")
      cell.setAttribute("id", `c-${y}-${x}`);
      // append the table cell to the table row
      row.append(cell);
    }
    //append the row to the html board
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return y coordinate of furthest-down spot
 *    (return null if filled) */

function findSpotForCol(x) {

  let y = HEIGHT - 1;

  while (y >= 0) {
    let cell = board[y][x];
    if (cell === null) {
      return y;
    } else
      y--;
  }

  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  //make a div and insert into correct table cell
  console.log(y, x);
  const piece = document.createElement("div");
  //add classes 'piece' `p${currPlayer}`
  piece.classList.add("piece");
  piece.classList.add(`p${currPlayer}`);
  //append the piece to cell with id of x and y as coord
  const cell = document.querySelector(`#c-${y}-${x}`);
  cell.append(piece);
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  console.log('checking for winner');
  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  //

  function _win(cells) { //[0, 1], [0, 2], [0, 3], [0, 4]
    // Check four cells to see if they're all legal & all color of current
    // player
    //loop over the outer array
    for (let cell of cells) {
      //loop over each coord --
      let y = cell[0];
      let x = cell[1];
      console.log(cell);
      //if y > height return false
      if (y >= HEIGHT) return false; //if below 0, return false
      if (x >= WIDTH) return false; //if below 0, return false
      //check board[y][x]
      //if it isn't the currentPlayer return false
      if (board[y][x] !== currPlayer) return false;
    }
    return true;
  }

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      // replacing coordinates below with coordinates above for readability
      // let diagDL = [[y, WIDTH-(x+1)], [y + 1, WIDTH-(x+2)], [y + 2, WIDTH-(x+3)],
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
  return false;
}

/** endGame: announce game end */

function endGame(msg) {
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const x = Number(evt.target.id.slice("top-".length));

  // get next spot in column (if none, ignore click)
  const y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  //add line to update global `board` variable with new piece
  board[y][x] = currPlayer;

  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie: if top row is filled, board is filled
  // TODO: check if all cells in board are filled; if so, call endGame

  // switch players
  // TODO: switch currPlayer 1 <-> 2

}

/** Start game. */

function start() {
  makeBoard();
  makeHtmlBoard();
}

start();