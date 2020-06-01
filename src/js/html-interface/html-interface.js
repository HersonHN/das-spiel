
import '../../css/components/board.css';
import '../../css/components/colors.css';

import { grabStart, grabStop, grabMove } from './events';

export class HTMLInterface {
  constructor({ board, cellSize, span = 2 }) {
    this.board = board;
    this.cellSize = cellSize;
    this.span = span;

    this.movement = {};
  }

  draw(parent) {
    this.parent = parent;

    let boardHTML = this.createBoard();
    this.addCells(boardHTML);
    parent.appendChild(boardHTML);
  }

  createBoard() {

    let board = document.createElement('section');
    this.board.element = board;

    board.classList.add('board');

    let cellSize = this.cellSize;
    let width = (this.cellSize + this.span) * this.board.cols + this.span;
    let height = (this.cellSize + this.span) * this.board.rows + this.span;

    board.style.width = `${width}px`;
    board.style.height = `${height}px`;
    board.style.lineHeight = `${cellSize}px`;
    board.style.fontSize = `${cellSize / 2}px`;

   return board;
  }

  addCells(boardHTML) {

    let board = this.board;
    let cells = this.board.cells;

    for (let nRow in cells) {
      let row = cells[nRow];

      for (let nCol in row) {
        let cell = row[nCol];

        let cellHTML = this.createCell(cell, {
          row: +nRow,
          col: +nCol,
          cellSize: this.cellSize,
          span: this.span,
        });

        cell.element = cellHTML;
        this.syncCell(cell);
        this.addCellEvents({ board, cell, boardHTML, cellHTML });

        boardHTML.appendChild(cellHTML);
      }
    }
  }

  createCell(cell, pos) {
    // output element:
    // <span class="cell color {color-name} {symbol-name}">
    //     {symbol-icon}
    // </span>

    let element = document.createElement('span');
    let width = this.cellSize;
    let height = this.cellSize;

    element.classList.add('cell', 'color');
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;

    return element;
  }

  syncCell(cell) {
    let { color, symbol, element } = cell;
    let { cellSize, span } = this;

    let top  = cell.row * (cellSize + span) + span;
    let left = cell.col * (cellSize + span) + span;

    element.classList.remove([...element.classList]);
    element.classList.add('cell', 'color', color.name, symbol.name);
    element.innerHTML = symbol.icon;

    element.style.top = `${top}px`;
    element.style.left = `${left}px`;
  }

  addCellEvents({ board, cell, boardHTML, cellHTML }) {
    let inter = this;

    cellHTML.addEventListener('mousedown', function (event) {
      grabStart({ board, cell, boardHTML, cellHTML, event, inter });
    });

    document.body.addEventListener('mouseup', function (event) {
      grabStop({ board, cell, boardHTML, cellHTML, event, inter });
    });

    document.body.addEventListener('mousemove', function (event) {
      grabMove({ board, cell, boardHTML, cellHTML, event, inter });
    });

  }


  changeMovement(newMovement) {
    if (newMovement.direction == this.movement.direction) return;

    this.movement.type = newMovement.type;
    this.movement.direction = newMovement.direction;

    console.log(this.movement);
  }

}