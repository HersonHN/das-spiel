
import { COLORS, SYMBOLS } from './game-constants';

export function randomColor(params) {
  return randomEntry(COLORS, params);
}

export function randomSymbol(params) {
  return randomEntry(SYMBOLS, params);
}

function randomEntry(array, { ignore }) {
  let pool = array.filter(item => !ignore.includes(item.name));

  let len = pool.length;
  let index = Math.floor(Math.random() * len);
  return pool[index];
}