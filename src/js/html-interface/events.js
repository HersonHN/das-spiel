
import * as helpers from '../classes/game-helpers';


export function grabStart({ event, inter }) {
  if (inter.busy) return;
  inter.resetValues();
  inter.grabbing = true;
  inter.start = getPoint(event);

  document.body.classList.add('grabbing');
}


export function grabMove({ board, cell, event, inter }) {
  if (inter.busy) return;
  if (!inter.grabbing) return;

  let { x, y } = getPoint(event);

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


export function grabStop({ inter }) {
  if (inter.busy) return;
  if (!inter.grabbing) return;

  inter.checkIfMoved();
  inter.calcuateNewPositions();

  if (inter.moved) {
    inter.findGroups();
  }

  inter.resetValues();
  document.body.classList.remove('grabbing');
}


function getPoint(event) {
  // check if its a touch move
  let point = event.touches ? event.touches[0] : event;
  return { x: point.clientX, y: point.clientY };
}
