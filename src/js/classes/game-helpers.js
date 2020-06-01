
export function smallDiff(n1, n2) {
  return Math.abs(n1 - n2) < 11;
}

export function calcutateMovement(origin, target) {
  let diffX = Math.abs(origin.x - target.x);
  let diffY = Math.abs(origin.y - target.y);

  let type = (diffX > diffY) ? 'H' : 'V';

  if (type === 'H') {
    if (origin.x > target.x) {
      return { type, direction: 'LEFT' };
    } else {
      return { type, direction: 'RIGHT' };
    }
  } else {
    if (origin.y > target.y) {
      return { type, direction: 'UP' };
    } else {
      return { type, direction: 'DOWN' };
    }
  }
}

export function pixelsMoved(movement, origin, target) {
  if (movement.type === 'H') {
    return target.x - origin.x;
  } else {
    return target.y - origin.y;
  }
}
