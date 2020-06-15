
import { randomItem, notRandomItem } from './randomness';


export class Cell {

  constructor({ row, col, board, ghost }) {
    this.row = row;
    this.col = col;
    this.id = `(${row + 1}, ${col + 1})`;
    this.board = board;

    if (ghost) {
      this.ghost = ghost;
    }

    this.interface = null;
    this.data = {};  // variables modified through the game

    if (ghost) {
      this.row = -99;
      this.col = -99;
      this.color = { name: 'ghost' };
      this.symbol = { name: 'ghost' };
    } else {
      this.selectValues();
    }
  }


  regenerate() {
    this.color  = this.selectRandomValue('color');
    this.symbol = this.selectRandomValue('symbol');

    this.interface.sync();
  }


  toString() {
    return `[${this.color.name} ${this.symbol.name}]`;
  }


  toJSON() {
    return {
      color: this.color.name,
      symbol: this.symbol.name,
    }
  }


  isSimilar(that, comparison) {
    if (comparison === 'full') {
      return (this.color.name === that.color.name && this.symbol.name === that.symbol.name);
    }

    if (comparison === 'color') {
      return (this.color.name === that.color.name);
    }

    if (comparison === 'symbol') {
      return (this.symbol.name === that.symbol.name);
    }

    console.error(`No comparison type set for ${this} & ${that}`);
    return false;
  }


  copyFrom(that) {
    this.row = that.row;
    this.col = that.col;
    this.board = that.board;
    this.data = clone(that.data);
    this.color = clone(that.color);
    this.symbol = clone(that.symbol);
  }


  selectValues() {
    if (this.board.demoData) {
      this.color  = this.selectNotRandomValue('color');
      this.symbol = this.selectNotRandomValue('symbol');
    } else {
      this.color  = this.selectRandomValue('color');
      this.symbol = this.selectRandomValue('symbol');
    }
  }


  selectNotRandomValue(prop) {
    let { row, col } = this;

    let value = this.board.demoData[row][col][prop];
    return notRandomItem(prop, value);
  }


  selectRandomValue(prop) {
    // do not include values from boundaries on the randomness
    let ignore = this.boundaries()
      .map(cell => cell[prop].name);
  
    return randomItem(prop, { ignore });
  }


  left() {
    let sameRow = this.board.cells[this.row];
    if (sameRow[this.col - 1]) {
      return sameRow[this.col - 1];
    }
    return null;
  }


  right() {
    let sameRow = this.board.cells[this.row];
    if (sameRow[this.col + 1]) {
      return sameRow[this.col + 1];
    }
    return null;
  }


  top() {
    let rowBefore = this.board.cells[this.row - 1];
    if (rowBefore) {
      return rowBefore[this.col];
    }

    return null;
  }


  bottom() {
    let rowAfter = this.board.cells[this.row + 1];
    if (rowAfter) {
      return rowAfter[this.col];
    }
    return null;
  }


  nextLine() {
    let rowAfter = this.board.cells[this.row + 1];
    if (rowAfter) {
      return rowAfter[0];
    }
    return null;
  }


  next() {
    if (this.right()) {
      return this.right();
    }
    if (this.nextLine()) {
      return this.nextLine();
    }
    return null;
  }


  boundaries() {
    return [
      this.top(), this.bottom(), this.left(), this.right()
    ].filter(x => x);
  }


  findGroup(comparison, visited = {}, group = []) {
    if (visited[this.id]) return [];

    // marking as visited
    visited[this.id] = true;

    let boundaries = this.boundaries();

    if (group.length == 0) {
      group.push(this.id);
    }

    for (let cell of boundaries) {
      if (this.isSimilar(cell, comparison) && !visited[cell.id]) {
        group.push(cell.id);
        cell.findGroup(comparison, visited, group);
      }
    }

    return group;
  }

}

function clone(obj) {
  return Object.assign({}, obj);
}

