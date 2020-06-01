
import { COLORS, SYMBOLS } from './game-constants';

export function randomItem(type, params) {
  if (type === 'color') {
    return randomEntry(COLORS, params);
  } else {
    return randomEntry(SYMBOLS, params);
  }
}

function randomEntry(array, { ignore }) {
  let pool = array.filter(item => !ignore.includes(item.name));

  let len = pool.length;
  let index = Math.floor(Math.random() * len);
  return pool[index];
}