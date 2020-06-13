
import { data } from './demo/demo';
import { Board } from './classes/board';
import { BoardInterface } from './html-interface/board.interface';


init();

function init() {
  let board = new Board({ rows: 6, cols: 6, data });
  let inter = new BoardInterface({ board, autosize: true });

  let domElement = document.querySelector('.the-game');
  inter.draw(domElement);
}
