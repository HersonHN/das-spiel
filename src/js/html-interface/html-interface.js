
import '../../css/components/board.css';

import { Cell } from '../classes/cell';

import * as events from './events';
import * as helpers from '../classes/game-helpers';

export class HTMLInterface {

  constructor({ board, cellSize, span = 2 }) {
    this.board = board;
    this.cellSize = cellSize;
    this.span = span;

    this.movement = {
      direction: '',
      type: ''
    };

    this.ghostCell = null;
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

    // add the values to the board data too
    this.board.data.width = width;
    this.board.data.height = height;

   return board;
  }


  addCells(boardHTML) {
    let board = this.board;
    let cells = this.board.cells;

    for (let nRow in cells) {
      let row = cells[nRow];

      for (let nCol in row) {
        let cell = row[nCol];

        let cellHTML = this.createCell();

        cell.element = cellHTML;
        this.syncCell(cell);
        this.addCellEvents({ board, cell, boardHTML, cellHTML });

        boardHTML.appendChild(cellHTML);
      }
    }

    // Ghost Cell
    this.createGhost();
    this.addBoardEvents();
  }


  createGhost() {
    this.ghostCell = new Cell({ ghost: true });
    this.ghostCell.element = this.createCell();
    this.syncCell(this.ghostCell);
    this.board.element.appendChild(this.ghostCell.element);
  }


  createCell() {
    // output element:
    // <span style="{ color }">{symbol.icon}</span>

    let element = document.createElement('span');
    let width = this.cellSize;
    let height = this.cellSize;

    element.className = 'cell';
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;

    return element;
  }


  syncCell(cell) {
    let { color, symbol, element } = cell;
    let { cellSize, span } = this;

    let top  = cell.row * (cellSize + span) + span;
    let left = cell.col * (cellSize + span) + span;

    element.innerHTML = symbol.icon;

    element.style.color = color.color;
    element.style.background = color.background;

    element.style.top = `${top}px`;
    element.style.left = `${left}px`;

    cell.data.topFixed = top;
    cell.data.leftFixed = left;

    cell.data.top = top;
    cell.data.left = left;
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
    cell.element.style.top = `${cell.data.top}px`;
    cell.element.style.left = `${cell.data.left}px`;
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
      events.grabStart({ event, inter });
    });

    // MOVE
    cellHTML.addEventListener('mousemove', function (event) {
      if (inter.busy) return;
      if (!inter.grabbing) return;
      events.grabMove({ board, cell, boardHTML, cellHTML, event, inter });
    });
  }


  addBoardEvents() {
    let inter = this;

    // RELEASE
    document.body.addEventListener('mouseup', function (event) {
      events.grabStop({ event, inter });
    });
    document.body.addEventListener('mouseleave', function (event) {
      events.grabStop({ event, inter });
    });
  }


  setMovement(newMovement) {
    let fistTime = (this.movement.direction === '');
    if (!fistTime) return fistTime;

    this.movement.type = newMovement.type;
    this.movement.direction = newMovement.direction;

    return fistTime;
  }


  applyMovement(cells, pixels, movement) {
    let cellProp = (movement.type === 'H') ? 'left' : 'top';
    let boardProp = (movement.type === 'H') ? 'width' : 'height';
    let boardLimit = this.board.data[boardProp];

    for (let cell of cells) {
      let oldPosition = cell.data[`${cellProp}Fixed`];
      let newPostion = oldPosition + pixels;

      newPostion = helpers.limits(newPostion, 0, boardLimit);

      cell.data[cellProp] = newPostion;
      cell.element.style[cellProp] = newPostion + 'px';
    }

    this.syncGhost({ cells, cellProp });
  }


  syncGhost({ cells, cellProp }) {
    let fullCellSize = this.cellSize + this.span;

    let maxCell = helpers.getMax(cells, cellProp);
    let minCell = helpers.getMin(cells, cellProp);

    if (this.ghostCell.toString() !== maxCell.toString()) {
      this.ghostCell.copyFrom(maxCell);
      this.syncCell(this.ghostCell);
    }

    let ghostCellPosition = minCell.data[cellProp] - fullCellSize;
    this.ghostCell.data[cellProp] = ghostCellPosition;

    this.syncCellPosition(this.ghostCell);
  }

}
