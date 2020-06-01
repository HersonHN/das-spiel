
import { smallDiff, calcutateMovement, pixelsMoved } from '../classes/game-helpers';

export function grabStart({ event, inter }) {
  inter.resetValues();
  inter.grabbing = true;
  inter.startingPoint = {
    x: event.clientX,
    y: event.clientY,
  };

  document.body.classList.add('grabbing');
}

export function grabStop({ event, inter }) {
  inter.resetValues();
  document.body.classList.remove('grabbing');
}

export function grabMove({ board, cell, boardHTML, cellHTML, event, inter }) {
  let { x, y } = { x: event.clientX, y: event.clientY };

  // if the cursor hasn't move enough, just ignore the event
  if (smallDiff(x, inter.startingPoint.x) && smallDiff(y, inter.startingPoint.y)) {
    return;
  }

  let movement = calcutateMovement(inter.startingPoint, { x, y });
  let changedMovement = inter.changeMovement(movement);

  // if the movement changes, reset the cell positions
  if (!changedMovement.same && !changedMovement.firstTime) {
    inter.busy = true;
    inter.resyncPositions();
  }

  // this select the list of cells to be moved
  if (!changedMovement.same) {
    inter.cellsMoved = (movement.type === 'V')
      ? board.returnCellsEqualAs({ type: 'V', col: cell.col })
      : board.returnCellsEqualAs({ type: 'H', row: cell.row });
  }

  let pixels = pixelsMoved(movement, inter.startingPoint, { x, y });

  inter.applyMovement(inter.cellsMoved, pixels, movement);
}



