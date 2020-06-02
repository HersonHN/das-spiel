
import * as helpers from '../classes/game-helpers';


export function grabStart({ event, inter }) {
  inter.resetValues();
  inter.grabbing = true;
  inter.start = {
    x: event.clientX,
    y: event.clientY,
  };

  document.body.classList.add('grabbing');
}


export function grabStop({ event, inter }) {
  inter.calcuateNewPositions();
  inter.resetValues();
  document.body.classList.remove('grabbing');
}


export function grabMove({ board, cell, event, inter }) {
  let { x, y } = { x: event.clientX, y: event.clientY };

  // if the cursor hasn't move enough, just ignore the event
  if (
    helpers.smallDiff(x, inter.start.x) &&
    helpers.smallDiff(y, inter.start.y)
  ) {
    return;
  }

  let firstTime = inter.setMovement(
    helpers.calcutateMovement(inter.start, { x, y })
  );

  // this select the list of cells to be moved
  if (firstTime) {
    inter.cellsMoved = (inter.movement.type === 'V')
      ? board.returnCellsEqualAs({ type: 'V', col: cell.col })
      : board.returnCellsEqualAs({ type: 'H', row: cell.row });
  }

  let pixels = helpers.pixelsMoved(inter.movement, inter.start, { x, y });
  inter.applyMovement(inter.cellsMoved, pixels, inter.movement);
}
