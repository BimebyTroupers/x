import inquirer from "inquirer";

import gameReducer, { move } from "./game";
import { createStore } from "redux";

const printBoard = () => {
  console.log("printBoard:", game.getState());
  const { board } = game.getState();
  for (let r = 0; r != 3; ++r) {
    for (let c = 0; c != 3; ++c) {
      process.stdout.write(board.getIn([r, c], "_"));
    }
    process.stdout.write("\n");
  }
};

const getInput = turn => async () => {
  const { player } = game.getState();
  if (player !== turn) return;
  const ans = await inquirer.prompt([
    {
      type: "input",
      name: "coord",
      message: `${player}'s move (row,col):`
    }
  ]);
  const [row = 0, col = 0] = ans.coord.split(/[,\s+]/).map(x => +x);
  game.dispatch(move(player, [row, col]));
};

// Create the store
const game = createStore(gameReducer);

// Debug: Print the state
game.subscribe(() => console.log("Subsribe: ", game.getState()));

game.subscribe(printBoard);
game.subscribe(getInput("X"));
game.subscribe(getInput("O"));

// We dispatch a dummy START action to call all our
// subscribers the first time.
game.dispatch({ type: "START" });
