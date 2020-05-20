import { play } from '../Connect4'

const cols = 7
const rows = 6

function getBoard(cols, rows) {
  return (new Array(cols))
    .fill(null)
    .map(
      () => (new Array(rows))
        .fill(null)
        .map(
          () => ({ value: null, winner: false })
        )
    )
}

describe('Connect4', () => {
  describe('returns expected state', () => {

    it('without state input', () => {
      const expectedState = {
        board: getBoard(cols, rows),
        moves: [],
        turn: 1,
        gameover: false,
        columnsPlayable: (new Array(7)).fill(true)
      }
      const state = play()
      expect(state).toEqual(expectedState)
    })

    it('with columns given', () => {
      const cols = 8
      const expectedState = {
        board: getBoard(cols, rows),
        moves: [],
        turn: 1,
        gameover: false,
        columnsPlayable: (new Array(cols)).fill(true)
      }
      const state = play({ cols })
      expect(state).toEqual(expectedState)
    })

    it('with rows given', () => {
      const expectedState = {
        board: getBoard(cols, rows),
        moves: [],
        turn: 1,
        gameover: false,
        columnsPlayable: (new Array(cols)).fill(true)
      }
      const state = play({ rows })
      expect(state).toEqual(expectedState)
    })

    it('with moves given', () => {
      const cols = 7
      const rows = 6
      const board = getBoard(cols, rows)
      board[0][0].value = 1
      board[0][1].value = 2
      const moves = [
        [0, 0, 1],
        [0, 1, 2]
      ]
      const expectedState = {
        board,
        moves,
        turn: 1,
        gameover: false,
        columnsPlayable: (new Array(cols)).fill(true)
      }
      const state = play({ rows, cols, moves })
      expect(state).toEqual(expectedState)
    })

    it('with illegal moves given', () => {
      const cols = 7
      const rows = 6
      const board = getBoard(cols, rows)
      board[0][0].value = 1
      board[0][1].value = 2
      const moves = [
        [0, 0, 1],
        [0, 1, 2]
      ]
      const inputMoves = [...moves, [10, 10, 2]]
      const expectedState = {
        board,
        moves,
        turn: 1,
        gameover: false,
        columnsPlayable: (new Array(cols)).fill(true)
      }
      const state = play({ rows, cols, moves: inputMoves })
      expect(state).toEqual(expectedState)
    })

    it('with turn given', () => {
      const cols = 7
      const rows = 6
      let state
      let expectedState

      expectedState = {
        board: getBoard(cols, rows),
        moves: [],
        turn: 2,
        gameover: false,
        columnsPlayable: (new Array(cols)).fill(true)
      }
      state = play({ turn: 2 })
      expect(state).toEqual(expectedState)

      expectedState = {
        board: getBoard(cols, rows),
        moves: [[0, 0, 2]],
        turn: 1,
        gameover: false,
        columnsPlayable: (new Array(cols)).fill(true)
      }
      expectedState.board[0][0].value = 2
      state = play({ turn: 2 }, 0)
      expect(state).toEqual(expectedState)
    })

    it('making a move', () => {
      const board = getBoard(cols, rows)
      board[0][0].value = 1
      const expectedState = {
        board,
        moves: [[0, 0, 1]],
        turn: 2,
        gameover: false,
        columnsPlayable: (new Array(7)).fill(true)
      }
      const state = play({ cols, rows }, 0)
      expect(state).toEqual(expectedState)
    })

    it('with winning moves', () => {
      const board = getBoard(cols, rows)
      const moves = []

      for (let i = 0; i < 4; i++) {
        board[0][i].value = 1
        board[0][i].winner = true

        moves.push([0, i, 1])
      }

      const expectedState = {
        board,
        moves,
        turn: 1,
        gameover: true,
        columnsPlayable: (new Array(7)).fill(true)
      }
      const state = play({ cols, rows, moves })
      expect(state).toEqual(expectedState)
    })

    it('with interrupted winning line', () => {
      const board = getBoard(cols, rows)
      const moves = []

      for (let i = 0; i < 6; i++) {
        let value = i === 1 ? 1 : 2
        board[0][i].value = value
        moves.push([0, i, value])
        if (i > 1) board[0][i].winner = true
      }

      const turn = 2

      const expectedState = {
        board,
        moves,
        turn,
        gameover: true,
        columnsPlayable: [false, true, true, true, true, true, true]
      }
      const state = play({ cols, rows, moves, turn })
      expect(state).toEqual(expectedState)
    })

  })
})