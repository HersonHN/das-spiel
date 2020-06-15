
import { Level } from './classes/level';
import { LevelInterface } from './html-interface/level.interface';


if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(init);
} else {
  init();
}



function init() {
  let gameBoardDOM = document.querySelector('.game-board');
  let levelInfoDOM = document.querySelector('.level-info');

  let level = new Level({ number: 1 });
  let inter = new LevelInterface({ level });

  inter.draw({ gameBoardDOM, levelInfoDOM });
}
