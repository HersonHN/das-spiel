
import { randomItem } from './randomness';


export class Cell {

  constructor({ row, col, board, ghost }) {
    this.row = row;
    this.col = col;
    this.board = board;
    this.ghost = ghost;

    // temporary variables modified through the game
    this.data = {};

    if (ghost) {
      this.row = -99;
      this.col = -99;
      this.color = { name: 'ghost' };
      this.symbol = { name: 'ghost' };
    } else {
      this.color = this.selectRandomValues('color', { row, col });
      this.symbol = this.selectRandomValues('symbol', { row, col });
    }
  }


  toString() {
    return `[${this.color.name} ${this.symbol.name}]`;
  }


  copyFrom(that) {
    this.row = that.row;
    this.col = that.col;
    this.board = that.board;
    this.data = clone(that.data);
    this.color = clone(that.color);
    this.symbol = clone(that.symbol);
  }


  selectRandomValues(type, { row, col }) {
    // do not include values from the left and upper cells in the randomness
    let ignore = [];

    if (this.board) {
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
    }

    return randomItem(type, { ignore });
  }
}


function clone(obj) {
  return Object.assign({}, obj);
}


