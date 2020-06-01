
import { smallDiff, calcutateMovement } from '../classes/game-helpers';

export function grabStart({ board, cell, boardHTML, cellHTML, event, inter }) {
  inter.grabbing = true;
  inter.startingPoint = {
    x: event.clientX,
    y: event.clientY,
  };

  document.body.classList.add('grabbing');
}

export function grabStop({ board, cell, boardHTML, cellHTML, event, inter }) {
  inter.grabbing = false;
  inter.startingPoint = { x: 0, y: 0 };

  document.body.classList.remove('grabbing');
}

export function grabMove({ board, cell, boardHTML, cellHTML, event, inter }) {
  if (!inter.grabbing) return;

  let { x, y } = {
    x: event.clientX,
    y: event.clientY,
  };

  if (smallDiff(x, inter.startingPoint.x) && smallDiff(y, inter.startingPoint.y)) {
    return;
  }

  let movement = calcutateMovement(inter.startingPoint, { x, y });
  inter.changeMovement(movement);
}



