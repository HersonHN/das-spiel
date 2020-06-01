
import { Cell } from './cell';


export class Board {

  constructor({ rows, cols }) {
    this.rows = rows;
    this.cols = cols;
    this.cells = [];

    this.memory = {};

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
}