import {Map} from 'immutable'

const initialState = { board: Map(), turn: 'X' }
export const move = (player, [row, col]) => {
  console.log({
    type: 'MOVE',
    player,
    position: [row, col]
  })
  return {
    type: 'MOVE',
    player,
    position: [row, col]
  }
}

export default function reducer(state = initialState, action) {
  // TODO
  console.log('Reducer: ', action)
  
  if (action.player === 'X') {
    return {
      board: state.board.setIn(action.position, action.player),
      turn: 'O'
    } 
  } else if (action.player === 'O') {
    return {
      board: state.board.setIn(action.position, action.player),
      turn: 'X'
    }
  }
  return state;
}