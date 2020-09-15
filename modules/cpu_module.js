import setState from "./utils.js";

function CpuModule(shared_state) {
  let board = shared_state.board_state;
  let player1 = shared_state.player1;
  let cpu = shared_state.cpu;

  function processTurn(piece) {
    console.log(
      "processing turn for: " + (board[piece] === cpu ? "CPU" : "Player1")
    );
    switch (board[piece]) {
      case cpu + "k":
        console.log(`looking for King move -7 || -9...`);
        if (board[piece - 7] === "e") {
          return setState(board, piece, -7, "bottom", piece - 7, cpu);
        }
        if (board[piece - 9] === "e") {
          return setState(board, piece, -9, "bottom", piece - 9, cpu);
        }
      case cpu:
        if (board[piece + 7] === "e") {
          return setState(board, piece, 7, "bottom", piece + 7, cpu);
        }
        if (board[piece + 9] === "e") {
          return setState(board, piece, 9, "bottom", piece + 9, cpu);
        }
      default:
        return false;
    }
  }

  function cpuMove(pieces) {
    let result = null;
    for (let i = 0; i < pieces.length; i++) {
      result = processTurn(parseInt(pieces[i].getAttribute("data-id")));
      if (result) {
        return result;
      }
    }
    return result;
  }

  function processJump(id) {
    console.log(`processing jump for space: ${id}`);
    switch (board[id]) {
      case cpu + "k":
        if (
          board[id - 18] &&
          board[id - 18] === "e" &&
          (board[id - 9] === player1 || board[id - 9] === player1 + "k")
        ) {
          return setState(board, id, -18, "bottom", id - 18, cpu);
        }
        if (
          board[id - 14] &&
          board[id - 14] === "e" &&
          (board[id - 7] === player1 || board[id - 7] === player1 + "k")
        ) {
          return setState(board, id, -14, "bottom", id - 14, cpu);
        }
      case cpu:
        if (
          board[id + 18] &&
          board[id + 18] === "e" &&
          (board[id + 9] === player1 || board[id + 9] === player1 + "k")
        ) {
          return setState(board, id, 18, "bottom", id + 18, cpu);
        }
        if (
          board[id + 14] &&
          board[id + 14] === "e" &&
          (board[id + 7] === player1 || board[id + 7] === player1 + "k")
        ) {
          return setState(board, id, 14, "bottom", id + 14, cpu);
        }
      default:
        return null;
    }
  }

  function cpuJump(pieces) {
    let id;
    let result = null;
    let jumps = 0;
    for (let i = 0; i < pieces.length; i++) {
      id = parseInt(pieces[i].getAttribute("data-id"));
      console.log(`[${id}]["${board[id]}"]: checking jumps...`);
      while ((result = processJump(id))) {
        id += result;
        jumps++;
        console.log(`step: ${result} jumps: ${jumps} id: ${id}`);
      }
      if (jumps) {
        return true;
      }
    }
    return false;
  }

  function cpuTurn() {
    let pieces = document.querySelectorAll(".black");
    let kings = document.querySelectorAll(".black-king");
    console.log(pieces);
    return (
      cpuJump(kings) || cpuJump(pieces) || cpuMove(kings) || cpuMove(pieces)
    );
  }

  return {
    cpuTurn,
  };
}

export { CpuModule };
