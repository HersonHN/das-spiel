
import * as Interface from './interface-helpers';
import * as helpers from '../classes/game-helpers';
import * as events from './events';

export class CellInterface {

  constructor({ cell, parent }) {
    this.cell = cell;
    this.parent = parent;
    this.element = null;

    cell.interface = this;
  }


  draw() {
    let element = this.createCell();
    this.element = element;
    this.sync();

    if (!this.cell.ghost) {
      this.addEvents();
    }

    this.parent.element.appendChild(this.element);
  }


  createCell() {
    // output element:
    // <span style="{ color }">{symbol.icon}</span>

    let element = document.createElement('span');
    let width = this.parent.cellSize;
    let height = this.parent.cellSize;

    element.className = 'cell';
    element.style.width = `${width}px`;
    element.style.height = `${height}px`;

    return element;
  }


  sync(forceFull) {
    let { row, col, color, symbol } = this.cell;
    let { fullCellSize, span, cellSize } = this.parent;

    let top  = (row * fullCellSize) + span;
    let left = (col * fullCellSize) + span;

    this.element.innerHTML = symbol.icon;

    this.element.style.color = color.color;
    this.element.style.background = color.background;

    this.element.style.top = `${top}px`;
    this.element.style.left = `${left}px`;

    if (forceFull) {
      this.element.style.width = `${cellSize}px`;
      this.element.style.height = `${cellSize}px`;
    }

    this.cell.data.topFixed = top;
    this.cell.data.leftFixed = left;

    this.cell.data.top = top;
    this.cell.data.left = left;
  }


  syncPosition() {
    this.element.style.top = `${this.cell.data.top}px`;
    this.element.style.left = `${this.cell.data.left}px`;
  }


  hide() {
    this.cell.color.name = '';
    this.cell.symbol.name = '';
    this.cell.col = -999;
    this.cell.row = -999;
    this.sync();
  }


  applyMovement(pixels, prop, limit) {
    let cell = this.cell;

    let oldPosition = cell.data[`${prop}Fixed`];
    let newPostion = oldPosition + pixels;

    newPostion = helpers.limits(newPostion, 0, limit);

    cell.data[prop] = newPostion;
    this.element.style[prop] = newPostion + 'px';
  }


  addEvents() {
    let inter = this.parent;
    let board = this.cell.board;
    let cell = this.cell;
    let element = this.element;

    // GRAB
    Interface.listener(element, ['mousedown', 'touchstart'], function (event) {
      events.grabStart({ event, inter });
    });

    // MOVE
    Interface.listener(element, ['mousemove', 'touchmove'], function (event) {
      events.grabMove({ board, cell, event, inter });
    });

  }


  glow(type) {
    let className = `glow-${type}`;
    let classList = this.element.classList;

    classList.add(className);
    setTimeout(()=> classList.remove(className), 1000);
  }

}
