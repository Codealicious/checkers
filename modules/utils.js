function isKing(board, row, move, player) {
  console.log(`checking king for ${player}- row: ${row} move: ${move}`);
  if (KINGS[row][move]) {
    board[move] = player + "k";
  } else {
    board[move] = player;
  }
}

function setState(board, piece, step, row, move, player) {
  console.log(
    `setting state for ${player}- piece: ${piece} step:${step} move: ${move}`
  );
  if (step % 2 === 0) {
    board[piece + step / 2] = "e";
  }
  if (!(board[piece] === player + "k")) {
    isKing(row, move, player);
  } else {
    board[move] = board[piece];
  }
  board[piece] = "e";
  return step;
}

export { setState };
