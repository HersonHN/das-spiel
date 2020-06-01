
import '../../css/components/board.css';
import '../../css/components/colors.css';

import { grabStart, grabStop, grabMove } from './events';

export class HTMLInterface {
  constructor({ board, cellSize, span = 2 }) {
    this.board = board;
    this.cellSize = cellSize;
    this.span = span;

    this.movement = {
      direction: '',
      type: ''
    };

    this.resetValues();
  }

  resetValues() {
    this.grabbing = false;
    this.busy = false;
    this.startingPoint = { x: 0, y: 0 };
    this.movement = { direction: '', type: '' };
    this.cellsMoved = [];
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
    let width = (this.cellSize + this.span) * this.board.cols;
    let height = (this.cellSize + this.span) * this.board.rows;

    board.style.width = `${width + this.span}px`;
    board.style.height = `${height + this.span}px`;
    board.style.lineHeight = `${cellSize}px`;
    board.style.fontSize = `${cellSize / 2}px`;

    // add the values to the board memory too
    this.board.memory.width = width;
    this.board.memory.height = height;

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

    this.addBoardEvents();

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

    cell.memory.top = top;
    cell.memory.left = left;
  }

  resync() {
    for (let row of this.board.cells) {
      for (let cell of row) {
        this.syncCell(cell);
      }
    }

    this.busy = false;
  }


  syncCellPosition(cell) {
    cell.element.style.top = `${cell.memory.top}px`;
    cell.element.style.left = `${cell.memory.left}px`;
  }

  resyncPositions() {
    for (let row of this.board.cells) {
      for (let cell of row) {
        this.syncCellPosition(cell);
      }
    }

    this.busy = false;
  }

  addCellEvents({ board, cell, boardHTML, cellHTML }) {
    let inter = this;

    // GRAB
    cellHTML.addEventListener('mousedown', function (event) {
      if (inter.busy) return;
      grabStart({ event, inter });
    });

    // MOVE
    cellHTML.addEventListener('mousemove', function (event) {
      if (inter.busy) return;
      if (!inter.grabbing) return;
      grabMove({ board, cell, boardHTML, cellHTML, event, inter });
    });
  }

  addBoardEvents() {
    let inter = this;

    // RELEASE
    document.body.addEventListener('mouseup', function (event) {
      grabStop({ event, inter });
    });
    document.body.addEventListener('mouseleave', function (event) {
      grabStop({ event, inter });
    });
  }

  changeMovement(newMovement) {
    let firstTime = (this.movement.direction === '');
    let same = newMovement.direction === this.movement.direction;

    if (same) return { same, firstTime };

    this.movement.type = newMovement.type;
    this.movement.direction = newMovement.direction;
    this.movement.same = same;

    return { same, firstTime };
  }

  applyMovement(cells, pixels, movement) {
    let cellProp;
    let boardProp;

    if (movement.type === 'H') {
      cellProp = 'left';
      boardProp = 'width';
    } else {
      cellProp = 'top';
      boardProp = 'height';
    }

    let boardLimit = this.board.memory[boardProp];

    for (let cell of cells) {
      let newPostion = cell.memory[cellProp] + pixels;

      if (newPostion > boardLimit) {
        newPostion -= boardLimit;
      } else
      if (newPostion < 0) {
        newPostion += boardLimit
      }
      cell.element.style[cellProp] = newPostion + 'px';
    }

  }

}