
import { Cell } from './cell';

export class Board {

  constructor({ rows, cols }) {
    this.rows = rows;
    this.cols = cols;
    this.cells = [];

    this.createCells();
  }

  createCells() {

    for (let nRow = 0; nRow < this.rows; nRow++) {
      let row = [];
      this.cells.push(row);

      for (let nCol = 0; nCol < this.cols; nCol++) {
        let cell = new Cell({ row: nRow, col: nCol }, this.cells);
        row.push(cell);
      }

    }

  }
}