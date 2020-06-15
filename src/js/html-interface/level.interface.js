

import { BoardInterface } from './board.interface';

export class LevelInterface {

  constructor({ level }) {
    this.level = level;
    this.boardContainer = null;

    this.boardInterface = new BoardInterface({
      board: level.board,
      autosize: true
    });

  }

  draw(boardContainer) {
    this.boardContainer = boardContainer;
    this.boardInterface.draw(boardContainer)
  }

}