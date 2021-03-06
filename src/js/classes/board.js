
import { Cell } from './cell';
import { containsArray } from './game-helpers';


export class Board {

  constructor({ rows, cols, level, data = null }) {
    this.rows = rows;
    this.cols = cols;

    // Connects with Level (see Level constructor)
    this.level = level;
    if (this.level) {
      this.level.board = this;
    }

    this.interface = null;
    this.cells = [];
    this.cellMap = {};
    this.data = {};
    this.demoData = data;

    this.createCells();
  }


  createCells() {
    for (let nRow = 0; nRow < this.rows; nRow++) {
      let row = [];
      this.cells.push(row);

      for (let nCol = 0; nCol < this.cols; nCol++) {
        let cell = new Cell({ row: nRow, col: nCol, board: this });
        row.push(cell);
        this.cellMap[cell.id] = cell;
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
    return JSON.stringify(this, null, 4);
  }


  toJSON() {
    return this.cells;
  }


  findGroups() {
    let sameColors = this.findGroupBy('color');
    let equals = this.findGroupBy('full');


    // removing the `equals` from the `sameColor` when those are exactly the same
    for (let eq of equals) {
      sameColors = sameColors.filter(co => !containsArray({ big: co, small: eq }));
    }

    // returning the instances for everything
    sameColors = this.cellInterFaces(sameColors);
    equals = this.cellInterFaces(equals);

    return { sameColors, equals };
  }


  findGroupBy(comparison) {
    let cell = this.cells[0][0];
    let visited = {};
    let groups = [];
    do {
      let group = cell.findGroup(comparison, visited);
      if (group.length > 3) {
        groups.push(group);
      }
      cell = cell.next();
    } while(cell);

    return groups.sort();
  }


  cellInterFaces(groups) {
    return groups.map(group =>
      group.map(cellId => this.cellMap[cellId])
    );
  }

}

