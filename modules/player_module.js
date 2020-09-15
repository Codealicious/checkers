export function PlayerModule(shared_state) {
  let board_state = shared_state.board_state;
  let spaces = shared_state.spaces;
  let player1 = shared_state.player1;
  let cpu = shared_state.cpu;

  function processTurn(piece, move) {
    console.log(
      "processing turn for: " + (board_state[piece] === cpu ? "CPU" : "Player1")
    );
    switch (board_state[piece]) {
      case player1 + "k":
        if (
          piece + 7 === move ||
          piece + 9 === move ||
          (piece + 14 === move &&
            (board_state[piece + 7] === cpu ||
              board_state[piece + 7] === cpu + "k")) ||
          (piece + 18 === move &&
            (board_state[piece + 9] === cpu ||
              board_state[piece + 9] === cpu + "k"))
        ) {
          return {
            step: move - piece,
            row: "top",
            player: player1,
            move,
            piece,
          };
        }
      case player1:
        if (
          piece - 7 === move ||
          piece - 9 === move ||
          (piece - 14 === move &&
            (board_state[piece - 7] === cpu ||
              board_state[piece - 7] === cpu + "k")) ||
          (piece - 18 === move &&
            (board_state[piece - 9] === cpu ||
              board_state[piece - 9] === cpu + "k"))
        ) {
          return {
            step: move - piece,
            row: "top",
            player: player1,
            move,
            piece,
          };
        }
        break;
      default:
        return false;
    }
  }

  function multiJump(currentSpace, step) {
    let n = 0;
    switch (board_state[currentSpace]) {
      case player1 + "k":
        if (step === 14 || step === 18 || step === -14 || step === -18) {
          if (
            board_state[currentSpace + 14] === "e" &&
            board_state[currentSpace + 7] === cpu
          ) {
            n++;
            spaces.index(currentSpace + 14).classList.add("highlight");
          }
          if (
            board_state[currentSpace + 18] === "e" &&
            board_state[currentSpace + 9] === cpu
          ) {
            n++;
            spaces.index(currentSpace + 18).classList.add("highlight");
          }
          if (
            board_state[currentSpace - 14] === "e" &&
            board_state[currentSpace - 7] === cpu
          ) {
            n++;
            spaces.index(currentSpace - 14).classList.add("highlight");
          }
          if (
            board_state[currentSpace - 18] === "e" &&
            board_state[currentSpace - 9] === cpu
          ) {
            n++;
            spaces.index(currentSpace - 18).classList.add("highlight");
          }
          return n;
        }
      case player1:
        if (step === -14 || step === -18) {
          if (
            board_state[currentSpace - 14] === "e" &&
            board_state[currentSpace - 7] === cpu
          ) {
            n++;
            spaces.index(currentSpace - 14).classList.add("highlight");
          }
          if (
            board_state[currentSpace - 18] === "e" &&
            board_state[currentSpace - 9] === cpu
          ) {
            n++;
            spaces.index(currentSpace - 18).classList.add("highlight");
          }
          return n;
        }
    }
  }

  return {
    processTurn,
    multiJump,
  };
}
