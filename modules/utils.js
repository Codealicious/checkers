const KINGS = {
  top: { 1: 1, 3: 1, 5: 1, 7: 1 },
  bottom: {
    56: 1,
    58: 1,
    60: 1,
    62: 1,
  },
};

function isKing(board, row, move, player) {
  if (KINGS[row][move]) {
    board[move] = player + "k";
  } else {
    board[move] = player;
  }
}

function setState(board, piece, step, row, move, player) {
  if (step % 2 === 0) {
    board[piece + step / 2] = "e";
  }
  if (!(board[piece] === player + "k")) {
    isKing(board, row, move, player);
  } else {
    board[move] = board[piece];
  }
  board[piece] = "e";
  return step;
}

export { setState };
