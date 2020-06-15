
import { BoardInterface } from './board.interface';

export class LevelInterface {

  constructor({ level }) {
    this.level = level;
    level.interface = this;

    this.boardInterface = new BoardInterface({
      board: level.board,
      autosize: true
    });

    this.element = null;
  }


  draw({ gameBoardDOM, levelInfoDOM }) {
    this.boardInterface.draw(gameBoardDOM);
    this.element = levelInfoDOM;
    this.sync();
  }


  sync() {
    let movements = Number(this.level.movements).toLocaleString();
    let points = Number(this.level.points).toLocaleString();
    let number = Number(this.level.number).toLocaleString();

    let content =
      // `Level:     ${number}\n` +
      `Movements: ${movements}\n` +
      `Points:    ${points}`

    this.element.innerHTML = content;
  }
}