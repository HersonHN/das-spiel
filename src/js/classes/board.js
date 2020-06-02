
import { Cell } from './cell';


export class Board {

  constructor({ rows, cols }) {
    this.rows = rows;
    this.cols = cols;
    this.cells = [];

    this.data = {};

    this.createCells();
  }


  createCells() {

    for (let nRow = 0; nRow < this.rows; nRow++) {
      let row = [];
      this.cells.push(row);

      for (let nCol = 0; nCol < this.cols; nCol++) {
        let cell = new Cell({ row: nRow, col: nCol, board: this });
        row.push(cell);
      }

    }
  }


  returnCellsEqualAs(params) {
    if (params.type === 'H') {
      return this.cells[params.row].map(cell => cell);
    }

    if (params.type === 'V') {
      let result = [];
      for (let row of this.cells) {
        result.push(row[params.col]);
      }
      return result;
    }

    return [];
  }


  replaceRowOrColumn({ cells, type }) {
    let colors = cells.map(cell => cell.color);
    let symbols = cells.map(cell => cell.symbol);

    if (type === 'row') {
      let row = cells[0].row;
      this.replaceRow({ row, colors, symbols });
    } else {
      let col = cells[0].col;
      this.replaceCol({ col, colors, symbols });
    }
  }


  replaceRow({ row, colors, symbols }) {
    let rowToChange = this.cells[row];

    for (let n in rowToChange) {
      let cell = rowToChange[n];

      cell.color = colors[n];
      cell.symbol = symbols[n];
    }
  }


  replaceCol({ col, colors, symbols }) {

    for (let row in this.cells) {
      let cell = this.cells[row][col];

      cell.color = colors[row];
      cell.symbol = symbols[row];
    }
  }


  toString() {
    return this.cells
      .map(row => row.join(' '))
      .join('\n');
  }
}