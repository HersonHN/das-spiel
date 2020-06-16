
import { demo } from './demo/demo';

import { Level } from './classes/level';
import { Board } from './classes/board';
import { LevelInterface } from './html-interface/level.interface';
import { BoardInterface } from './html-interface/board.interface';

import { loadLevel } from './html-interface/interface-helpers';


if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(init);
} else {
  init();
}


function init() {
  let gameBoardDOM = document.querySelector('.game-board');
  let levelInfoDOM = document.querySelector('.level-info');

  let saved = loadLevel();
  let boardData = saved.board || demo;

  let board = new Board({ rows: 6, cols: 6, data: boardData });
  let boardInterface = new BoardInterface({ board: board, autosize: true });

  let level = new Level({
    number: saved.number,
    movements: saved.movements,
    points: saved.points,
    board
  });
  let levelInterface = new LevelInterface({ level });

  boardInterface.draw(gameBoardDOM);
  levelInterface.draw(levelInfoDOM);
}
