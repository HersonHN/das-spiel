import '../../css/components/board.css';

import { Cell } from '../classes/cell';
import { CellInterface } from './cell.interface';
import * as Interface from './interface-helpers';
import * as events from './events';
import * as helpers from '../classes/game-helpers';


export class BoardInterface {

  constructor({ board, autosize, cellSize = 50, span = 2 }) {
    this.board = board;
    this.autosize = autosize;

    if (autosize) {
      cellSize = Interface.getBestSize({ span, board });
    }

    this.cellSize = cellSize;
    this.span = span;
    this.fullCellSize = cellSize + span;

    this.ghostCell = null;
    this.container = null;
    this.cellInterface = CellInterface;

    this.resetValues();
  }


  resetValues() {
    this.grabbing = false;
    this.busy = false;
    this.start = { x: 0, y: 0 };
    this.movement = { direction: '', type: '' };
    this.cellsMoved = [];

    this.lastPixelsMovement = 0;
    this.moved = false;
  }


  draw(container) {
    this.container = container;
    this.createElement();
    this.syncElement();
    this.addCells();

    this.container.appendChild(this.element);
  }


  createElement() {
    let element = document.createElement('section');
    element.classList.add('board');
    this.element = element;
  }


  syncElement() {
    let cellSize = this.cellSize;

    let width = (this.cellSize + this.span) * this.board.cols;
    let height = (this.cellSize + this.span) * this.board.rows;

    this.element.style.width = `${width + this.span}px`;
    this.element.style.height = `${height + this.span}px`;
    this.element.style.lineHeight = `${cellSize}px`;
    this.element.style.fontSize = `${cellSize / 2}px`;

    // add the values to the board data too
    this.board.data.width = width;
    this.board.data.height = height;
  }


  addCells() {
    let cells = this.board.cells;

    for (let nRow in cells) {
      let row = cells[nRow];

      for (let nCol in row) {
        let cell = row[nCol];

        let cellInterface = new CellInterface({ cell, parent: this });
        cellInterface.draw();
      }
    }

    // Ghost Cell
    this.createGhost();
    this.addEvents();
  }


  createGhost() {
    let cell = new Cell({ ghost: true });
    this.ghostCell = new CellInterface({ cell, parent: this });;
    this.ghostCell.draw();
  }


  resync(forceFull) {
    for (let row of this.board.cells) {
      for (let cell of row) {
        cell.interface.sync(cell, forceFull);
      }
    }
    this.busy = false;
  }


  resyncAll() {
    this.cellSize = Interface.getBestSize({ span: this.span, board: this.board });
    this.fullCellSize = this.cellSize + this.span;
    this.resync(true);
    this.ghostCell.sync(true);
    this.syncElement();
  }


  resyncPositions() {
    for (let row of this.board.cells) {
      for (let cell of row) {
        cell.interface.syncPosition();
      }
    }

    this.busy = false;
  }


  addEvents() {
    let inter = this;

    // RELEASE
    Interface.listener(document.body, ['mouseup', 'mouseleave', 'touchend'], function () {
      events.grabStop({ inter });
    });

    // RESIZE
    if (this.autosize) {
      Interface.listener(window, ['resize'], () => { this.resyncAll() });
    }
  }


  setMovement(newMovement) {
    let fistTime = (this.movement.direction === '');
    if (!fistTime) return fistTime;

    this.movement = Object.assign({}, newMovement);
    return fistTime;
  }


  applyMovement(cells, pixels, movement) {
    let { cellProp, boardProp } = movement;
    let boardLimit = this.board.data[boardProp];

    this.lastPixelsMovement = pixels;

    for (let cell of cells) {
      cell.interface.applyMovement(pixels, cellProp, boardLimit);
    }

    this.syncGhost({ cells, cellProp });
  }


  syncGhost({ cells, cellProp }) {
    let maxCell = helpers.getMax(cells, cellProp);
    let minCell = helpers.getMin(cells, cellProp);

    if (!this.ghostCell.cell.isSimilar(maxCell, 'full')) {
      this.ghostCell.cell.copyFrom(maxCell);
      this.ghostCell.sync();
    }

    let ghostCellPosition = minCell.data[cellProp] - this.fullCellSize;
    this.ghostCell.cell.data[cellProp] = ghostCellPosition;

    this.ghostCell.syncPosition();
  }


  checkIfMoved() {
    this.moved = (this.lastPixelsMovement >= this.cellSize / 2);
  }


  calcuateNewPositions() {
    if (this.cellsMoved.length === 0) return;

    this.busy = true;
    this.grabbing = false;

    let type = (this.movement.type === 'H') ? 'row' : 'col';
    let prop = this.movement.cellProp;
    let sorted = this.cellsMoved
      .sort((cellA, cellB) => cellA.data[prop] - cellB.data[prop]);

    // check the height of the higher element to calculate if it should be the first or the second
    let [upperCell] = sorted;
    let position = upperCell.data[prop];
    let moveCell = (position > this.fullCellSize / 2);

    if (moveCell) {
      let lowerCell = sorted.pop();
      sorted.unshift(lowerCell);
    }

    this.board.replaceRowOrColumn({ cells: sorted, type: type });
    this.ghostCell.hide();
    this.resync();
    // this.resetValues();
  }


  findGroups() {
    let groups = this.board.findGroups();
    let { sameColors, equals } = groups;

    for (let group of sameColors) {
      for (let cell of group) {
        cell.interface.glow('dim');
      }
    }

    for (let group of equals) {
      for (let cell of group) {
        cell.interface.glow('bright');
      }
    }
  }

}
