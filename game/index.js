import { Map } from "immutable";

const initialState = { board: Map(), turn: 1, player: "X" };

function streak(board, ...coords) {
  if (
    board.getIn(coords[0]) === board.getIn(coords[1]) &&
    board.getIn(coords[0]) === board.getIn(coords[2])
  ) {
    return board.getIn(coords[0]);
  } else {
    return undefined;
  }
}

function winner(board) {
  const rows = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  const checked = rows.map(row => streak(board, ...row));
  if (state.turn > 9) {
    return "DRAW";
  } else if (checked.includes("X")) {
    return "X";
  } else if (checked.includes("O")) {
    return "O";
  } else {
    return null;
  }
}

export const move = (player, [row, col]) => {
  console.log({
    type: "MOVE",
    player,
    position: [row, col]
  });
  return {
    type: "MOVE",
    player,
    position: [row, col]
  };
};

function turnReducer(state = { player: "X", turn: 1 }, action) {
  console.log("Reducer: ", action);
  if (action.type === "MOVE") {
    return {
      player: action.player === "X" ? "O" : "X",
      turn: action.turn + 1
    };
  }
  return state;
}

function boardReducer(board = Map(), action) {
  console.log("Reducer: ", action);

  if (action.type === "MOVE") {
    return board.setIn(action.position, action.player);
  }
  return board;
}

export default function reducer(state = {}, action) {
  console.log("Reducer: ", action);
  console.log("turnReducer", turnReducer(action.player, action));
  const { turn, player } = turnReducer(action.player, action);
  return {
    turn,
    player,
    // ...turnReducer(state.player, action),
    board: boardReducer(state.board, action)
  };
}
