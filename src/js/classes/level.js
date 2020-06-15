
import { data } from '../demo/demo';
import { Board } from './board';

import * as helpers from './game-helpers';
import * as constants from './game-constants';

export class Level {

  constructor() {
    this.interface = null;
    this.points = 0;
    this.movements = 0;

    this.board = new Board({
      rows: 6,
      cols: 6,
      data,
      level: this,
    });
  }


  accountMovement({ normal, extra }) {
    this.movements++;
    this.accountCells({ normal, extra });
    this.interface.sync();
  }

  accountCells({ normal, extra }) {
    if (normal.length === 0 && extra.length === 0) return;

    let allCells = helpers.joinArrays(normal, extra);
    let allNormalCells = helpers.joinArrays(normal);
    let allExtraCells = helpers.joinArrays(extra);

    this.accountPoints(allNormalCells.length * constants.NORMAL_CELL_POINTS);
    this.accountPoints(allExtraCells.length * constants.EXTRA_CELL_POINTS);

    helpers.wait(constants.CHANGE_CELL_DELAY)
      .then(() => this.generateNewCells(allCells));

  }


  generateNewCells(cellList) {
    for (let cell of cellList) {
      cell.regenerate();
    }
  }


  accountPoints(points) {
    if (isNaN(points)) {
      throw `INVALID POINT AMOUNT: ${points}`;
    }

    this.points += points;
  }

}
