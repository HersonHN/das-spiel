
import { saveLevel, listener } from './interface-helpers';


export class LevelInterface {

  constructor({ level }) {
    if (!level) {
      throw 'You need to provide a level for the level interface';
    }
    this.level = level;
    level.interface = this;

    this.element = null;
  }


  draw(element) {
    this.element = element;
    this.sync();
    this.addEvents();
  }


  sync() {
    let output = this.element.querySelector('.output');

    let movements = Number(this.level.movements).toLocaleString();
    let points = Number(this.level.points).toLocaleString();
    let number = Number(this.level.number).toLocaleString();

    let content =
      // `Level:     ${number}\n` +
      `Movements: ${movements}\n` +
      `Points:    ${points}`

    output.innerHTML = content;
  }


  afterNewCells() {
    saveLevel({ level: this.level });
  }


  addEvents() {
    let button = this.element.querySelector('.new-game');

    listener(button, ['click'], () => {
      if (!confirm('Restart the game?')) return;
      localStorage.clear();
      location.reload();
    });
  }

}
