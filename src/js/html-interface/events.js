
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

  let firstTime = inter.setMovement(
    calcutateMovement(inter.startingPoint, { x, y })
  );

  // this select the list of cells to be moved
  if (firstTime) {
    inter.cellsMoved = (inter.movement.type === 'V')
      ? board.returnCellsEqualAs({ type: 'V', col: cell.col })
      : board.returnCellsEqualAs({ type: 'H', row: cell.row });
  }

  let pixels = pixelsMoved(inter.movement, inter.startingPoint, { x, y });
  inter.applyMovement(inter.cellsMoved, pixels, inter.movement);
}


