
import { Level } from './classes/level';
import { LevelInterface } from './html-interface/level.interface';


init();

function init() {
  let domElement = document.querySelector('.the-game');

  let level = new Level();
  let inter = new LevelInterface({ level });
  inter.draw(domElement);
}
