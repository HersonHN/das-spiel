
import { data } from '../demo/demo';
import { Board } from './board';

export class Level {
  constructor() {
    this.board = new Board({ rows: 6, cols: 6, data });
  }
}
