import { PlayerModule } from "./modules/player_module.js";
import { CpuModule } from "./modules/cpu_module.js";

NodeList.prototype.index = function (n) {
  return this[Math.floor(n / 2)];
};

function game_driver() {
  let activePlayer;
  let player1;
  let cpu;
  let currentSelection;
  let spaces;
  let board_state;
  let player_mod;
  let cpu_mod;
  const KINGS = {
    top: { 1: 1, 3: 1, 5: 1, 7: 1 },
    bottom: {
      56: 1,
      58: 1,
      60: 1,
      62: 1,
    },
  };

  function initialize() {
    spaces = document.querySelectorAll("[data-id]");
    currentSelection = null;
    activePlayer = 1;
    player1 = "r";
    cpu = "b";
    board_state = {
      1: cpu,
      3: cpu,
      5: cpu,
      7: cpu,
      8: cpu,
      10: cpu,
      12: cpu,
      14: cpu,
      17: cpu,
      19: cpu,
      21: cpu,
      23: cpu,
      24: "e",
      26: "e",
      28: "e",
      30: "e",
      33: "e",
      35: "e",
      37: "e",
      39: "e",
      40: player1,
      42: player1,
      44: player1,
      46: player1,
      49: player1,
      51: player1,
      53: player1,
      55: player1,
      56: player1,
      58: player1,
      60: player1,
      62: player1,
    };
    player_mod = PlayerModule({ board_state, spaces, player1, cpu });
    cpu_mod = CpuModule({ board_state, player1, cpu });
    renderBoard();
  }

  function renderBoard() {
    for (let key in board_state) {
      let n = parseInt(key);
      switch (board_state[key]) {
        case "b":
          spaces.index(n).classList.add("black");
          spaces
            .index(n)
            .classList.remove("red", "red-king", "black-king", "highlight");
          break;
        case "r":
          spaces.index(n).classList.add("red");
          spaces
            .index(n)
            .classList.remove("black", "red-king", "black-king", "highlight");
          break;
        case "rk":
          spaces.index(n).classList.add("red-king");
          spaces
            .index(n)
            .classList.remove("black", "red", "black-king", "highlight");
          break;
        case "bk":
          spaces.index(n).classList.add("black-king");
          spaces
            .index(n)
            .classList.remove("black", "red", "red-king", "highlight");
          break;
        default:
          spaces
            .index(n)
            .classList.remove(
              "black",
              "red",
              "red-king",
              "black-king",
              "highlight"
            );
      }
    }
  }

  function selectPiece(e) {
    if (activePlayer && e.target.hasAttribute("data-id")) {
      activePlayer = 0;
      let move = parseInt(e.target.getAttribute("data-id"));
      if (
        board_state[move] === player1 ||
        board_state[move] === player1 + "k"
      ) {
        if (currentSelection) {
          currentSelection.classList.remove("highlight");
          currentSelection = e.target;
          currentSelection.classList.add("highlight");
        } else {
          currentSelection = e.target;
          currentSelection.classList.add("highlight");
        }
      } else if (currentSelection && board_state[move] === "e") {
        let result = player_mod.processTurn(
          parseInt(currentSelection.getAttribute("data-id")),
          move
        );
        console.log("result: ", result);
        if (result) {
          renderBoard();
          if (!player_mod.multiJump(move, result)) {
            if (cpu_mod.cpuTurn()) {
              renderBoard();
            } else {
              console.log("game over!");
              initialize();
            }
          }
        }
      }
      activePlayer = 1;
    }
  }

  return {
    initialize,
    selectPiece,
  };
}

let game;
game = game_driver();
game.initialize();
document
  .querySelector(".board")
  .addEventListener("click", game.selectPiece, false);
