
import { STORAGE_FORMAT } from '../classes/game-constants';


export function getBestSize({ span, board }) {
  let w = width();
  let h = height();
  let total = Math.min(w, h);
  let cellCounts = (w > h) ? board.rows : board.cols;

  let size = Math.floor((total - 20) / cellCounts) - span;
  return size;
}

function width() {
  return Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
}

function height() {
  return Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
}


export function listener(who, events, callback) {
  events.forEach(event => who.addEventListener(event, callback));
}


export function saveLevel({ level }) {
  let board = level.board;

  let data = {
    points: level.points,
    movements: level.movements,
    number: level.number,
    board: board
  };

  let json = JSON.stringify(data);

  localStorage.setItem('level', json);
  localStorage.setItem('level-version', STORAGE_FORMAT);
}


export function loadLevel() {
  let json = localStorage.getItem('level');
  let version = localStorage.getItem('level-version');

  if (!json) return {};

  if (version !== STORAGE_FORMAT) {
    return {};
  }

  try {
    json = JSON.parse(json);
  } catch (error) {
    localStorage.clear();
    return {};
  }

  return json;
}
