

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
