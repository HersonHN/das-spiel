
export function smallDiff(n1, n2) {
  return Math.abs(n1 - n2) < 11;
}


export function calcutateMovement(origin, target) {
  let diffX = Math.abs(origin.x - target.x);
  let diffY = Math.abs(origin.y - target.y);

  let isHorizontal = (diffX > diffY);
  let prop = isHorizontal ? 'x' : 'y';
  let type = isHorizontal ? 'H' : 'V';
  let direction = (origin[prop] > target[prop]) ? '-' : '+';

  let cellProp = isHorizontal ? 'left' : 'top';
  let boardProp = isHorizontal ? 'width' : 'height';

  return { type, direction, cellProp, boardProp };
}


export function pixelsMoved(movement, origin, target) {
  if (movement.type === 'H') {
    return target.x - origin.x;
  } else {
    return target.y - origin.y;
  }
}


export function getMax(cells, prop) {
  let max = Number.MIN_SAFE_INTEGER;
  let maxCell = null;

  for (let cell of cells) {
    if (cell.data[prop] > max) {
      maxCell = cell;
      max = cell.data[prop];
    }
  }

  return maxCell;
}

export function getMin(cells, prop) {
  let min = Number.MAX_SAFE_INTEGER;
  let minCell = null;

  for (let cell of cells) {
    if (cell.data[prop] < min) {
      minCell = cell;
      min = cell.data[prop];
    }
  }

  return minCell;
}


export function limits(value, lower, upper) {
  if (value > upper) return value - upper;
  if (value <= lower) return value + upper;
  return value;
}
