function CpuModule(shared_state) {
  let board_state = shared_state.board_state;
  let player1 = shared_state.player1;
  let cpu = shared_state.cpu;

  function processTurn(piece) {
    console.log(
      "processing turn for: " + (board_state[piece] === cpu ? "CPU" : "Player1")
    );
    switch (board_state[piece]) {
      case cpu + "k":
        console.log(`looking for King move -7 || -9...`);
        if (board_state[piece - 7] === "e") {
          return [
            {
              step: -7,
              row: "bottom",
              player: cpu,
              move: piece - 7,
              piece,
            },
          ];
        }
        if (board_state[piece - 9] === "e") {
          return [
            {
              step: -9,
              row: "bottom",
              player: cpu,
              move: piece - 9,
              piece,
            },
          ];
        }
      case cpu:
        if (board_state[piece + 7] === "e") {
          return [
            {
              step: 7,
              row: "bottom",
              player: cpu,
              move: piece + 7,
              piece,
            },
          ];
        }
        if (board_state[piece + 9] === "e") {
          return [
            {
              step: 9,
              row: "bottom",
              player: cpu,
              move: piece + 9,
              piece,
            },
          ];
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
    switch (board_state[id]) {
      case cpu + "k":
        if (
          board_state[id - 18] &&
          board_state[id - 18] === "e" &&
          (board_state[id - 9] === player1 ||
            board_state[id - 9] === player1 + "k")
        ) {
          return {
            step: -18,
            row: "bottom",
            player: cpu,
            move: id - 18,
            piece: id,
          };
        }
        if (
          board_state[id - 14] &&
          board_state[id - 14] === "e" &&
          (board_state[id - 7] === player1 ||
            board_state[id - 7] === player1 + "k")
        ) {
          return {
            step: -14,
            row: "bottom",
            player: cpu,
            move: id - 14,
            piece: id,
          };
        }
      case cpu:
        if (
          board_state[id + 18] &&
          board_state[id + 18] === "e" &&
          (board_state[id + 9] === player1 ||
            board_state[id + 9] === player1 + "k")
        ) {
          return {
            step: 18,
            row: "bottom",
            player: cpu,
            move: id + 18,
            piece: id,
          };
        }
        if (
          board_state[id + 14] &&
          board_state[id + 14] === "e" &&
          (board_state[id + 7] === player1 ||
            board_state[id + 7] === player1 + "k")
        ) {
          return {
            step: 14,
            row: "bottom",
            player: cpu,
            move: id + 14,
            piece: id,
          };
        }
      default:
        return null;
    }
  }

  function cpuJump(pieces) {
    let id;
    let result = null;
    let jumps = 0;
    let results = [];
    for (let i = 0, j; i < pieces.length; i++) {
      id = parseInt(pieces[i].getAttribute("data-id"));
      console.log(`["${board_state[id]}"]: checking jumps...`);
      j = 0;
      while ((result = processJump(id))) {
        id = result.move;
        jumps++;
        results[j++] = result;
        console.log(`step: ${result.step} jumps: ${jumps} id: ${id}`);
      }
      console.log(`jumps: ${jumps}`, "results", results);
      if (results.length) {
        return results;
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
