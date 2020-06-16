
import * as helpers from './game-helpers';
import * as constants from './game-constants';

export class Level {

  constructor({ number, points, movements, board }) {
    this.number = number || 1;
    this.points = points || 0;
    this.movements = movements || 0;

    // Connects with Board (see Board constructor)
    this.board = board;
    if (this.board) {
      this.board.level = this;
    }

    this.interface = null;
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

    this.interface.afterNewCells();
  }


  accountPoints(points) {
    if (isNaN(points)) {
      throw `INVALID POINT AMOUNT: ${points}`;
    }

    this.points += points;
  }

}
