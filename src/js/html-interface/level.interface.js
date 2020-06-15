
import { BoardInterface } from './board.interface';

export class LevelInterface {

  constructor({ level }) {
    this.level = level;
    level.interface = this;
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


  sync() {
    console
      .log({
        movements: this.level.movements,
        points: this.level.points,
      });
  }
}