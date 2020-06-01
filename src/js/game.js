
import { Board } from './classes/board';
import { HTMLInterface } from './html-interface/html-interface';

init();

function init() {
  let board = new Board({ rows: 6, cols: 6 });
  let inter = new HTMLInterface({ board, cellSize: 75, span: 3 });

  let domElement = document.querySelector('.the-game');
  inter.draw(domElement);
}
