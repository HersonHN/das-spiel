
import { randomColor, randomSymbol } from './randomness';

export class Cell {

  constructor({ row, col }, board) {
    this.row = row;
    this.col = col;

    // do not include values from the left and upper cells in the randomness

    // colors
    let excludeColors = [];
    if (row > 0) {
      let color = board[row - 1][col].color.name;
      excludeColors.push(color);
    }
    if (col > 0) {
      let color = board[row][col - 1].color.name;
      excludeColors.push(color);
    }

    // symbols
    let excludeSymbols = [];
    if (row > 0) {
      let symbol = board[row - 1][col].symbol.name;
      excludeSymbols.push(symbol);
    }
    if (col > 0) {
      let symbol = board[row][col - 1].symbol.name;
      excludeSymbols.push(symbol);
    }

    this.color = randomColor({ ignore: excludeColors });
    this.symbol = randomSymbol({ ignore: excludeSymbols });
  }
}




