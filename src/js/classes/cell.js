
import { randomItem } from './randomness';


export class Cell {

  constructor({ row, col, board }) {
    this.row = row;
    this.col = col;
    this.board = board;

    // temporary variables modified through the game
    this.memory = {};

    this.color = this.selectRandomValues('color', { row, col });
    this.symbol = this.selectRandomValues('symbol', { row, col });
  }


  selectRandomValues(type, { row, col }) {
    // do not include values from the left and upper cells in the randomness
    let ignore = [];

    if (row > 0) {
      let cell = this.board.cells[row - 1][col];
      let value = cell[type].name;
      ignore.push(value);
    }

    if (col > 0) {
      let cell = this.board.cells[row][col - 1];
      let value = cell[type].name;
      ignore.push(value);
    }

    return randomItem(type, { ignore });
  }
}




