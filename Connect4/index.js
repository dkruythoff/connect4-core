import { getWinner } from './winner'
import { getBoard, getBoardWithMoves, getBoardWithWinners, getFreeIndexPerColumn } from './board'

const defaultState = {
  cols: 7,
  rows: 6,
  moves: [],
  turn: 1
}
export function play({
  cols = defaultState.cols,
  rows = defaultState.rows,
  moves = defaultState.moves,
  turn = defaultState.turn
} = defaultState, playColumn) {

  let nextTurn = turn
  let newMoves = [...moves]
  let board = getBoard(cols, rows)
  let gameover = false

  if (moves.length) board = getBoardWithMoves(board, moves)

  const freeIndexPerColumn = getFreeIndexPerColumn(board)
  const columnsPlayable = freeIndexPerColumn.map(index => index !== -1)

  if (typeof playColumn === 'number' && columnsPlayable[playColumn]) {
    newMoves.push([playColumn, freeIndexPerColumn[playColumn], turn])
    board = getBoardWithMoves(board, newMoves)
    const winner = getWinner(board, turn)

    if (!!winner) {
      board = getBoardWithWinners(board, winner.winningCoordinates)
      gameover = true
    } else {
      nextTurn = turn === 1 ? 2 : 1
    }
  }

  return {
    board,
    columnsPlayable,
    gameover,
    moves: newMoves,
    turn: nextTurn
  }
}
