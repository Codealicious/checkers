import { setState } from "./utils.js";

function PlayerModule(shared_state) {
  let board = shared_state.board_state;
  let spaces = shared_state.spaces;
  let player1 = shared_state.player1;
  let cpu = shared_state.cpu;

  function processTurn(piece, move) {
    switch (board[piece]) {
      case player1 + "k":
        if (
          piece + 7 === move ||
          piece + 9 === move ||
          (piece + 14 === move &&
            (board[piece + 7] === cpu || board[piece + 7] === cpu + "k")) ||
          (piece + 18 === move &&
            (board[piece + 9] === cpu || board[piece + 9] === cpu + "k"))
        ) {
          return setState(board, piece, move - piece, "top", move, player1);
        }
      case player1:
        if (
          piece - 7 === move ||
          piece - 9 === move ||
          (piece - 14 === move &&
            (board[piece - 7] === cpu || board[piece - 7] === cpu + "k")) ||
          (piece - 18 === move &&
            (board[piece - 9] === cpu || board[piece - 9] === cpu + "k"))
        ) {
          return setState(board, piece, move - piece, "top", move, player1);
        }
      default:
        return false;
    }
  }

  function multiJump(move, step) {
    let n = 0;
    switch (board[move]) {
      case player1 + "k":
        if (step === 14 || step === 18 || step === -14 || step === -18) {
          if (board[move + 14] === "e" && board[move + 7] === cpu) {
            n++;
            spaces.index(move + 14).classList.add("highlight");
          }
          if (board[move + 18] === "e" && board[move + 9] === cpu) {
            n++;
            spaces.index(move + 18).classList.add("highlight");
          }
          if (board[move - 14] === "e" && board[move - 7] === cpu) {
            n++;
            spaces.index(move - 14).classList.add("highlight");
          }
          if (board[move - 18] === "e" && board[move - 9] === cpu) {
            n++;
            spaces.index(move - 18).classList.add("highlight");
          }
          return n;
        }
      case player1:
        if (step === -14 || step === -18) {
          if (board[move - 14] === "e" && board[move - 7] === cpu) {
            n++;
            spaces.index(move - 14).classList.add("highlight");
          }
          if (board[move - 18] === "e" && board[move - 9] === cpu) {
            n++;
            spaces.index(move - 18).classList.add("highlight");
          }
          return n;
        }
    }
    return n;
  }

  return {
    processTurn,
    multiJump,
  };
}

export { PlayerModule };
