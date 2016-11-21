import GameCtrl from '../controllers/game'

export function deleteGame (key) {
  GameCtrl.deleteGame(key)
  return {
    type: 'DELETE_GAME_SUCCESS'
  }
}

export function clearGames () {
  return {
    type: 'CLEAR_GAMES'
  }
}

export function joinGame (game) {
  GameCtrl.joinGame(game)
  return {
    type: 'JOIN_GAME_SUCCESS'
  }
}

export function createGame (name) {
  const request = GameCtrl.createGame(name)
  return {
    type: 'CREATE_GAME_SUCCESS',
    payload: request
  }
}

export function subscribeToGames () {
  return function (dispatch) {
    let type = 'FETCH_GAMES_SUCCESS'
    GameCtrl.subscribeToGames(dispatch, type)
  }
}

export function subscribeToGame (key) {
  return function (dispatch) {
    let type = 'FETCH_GAME_SUCCESS'
    GameCtrl.subscribeToGame(dispatch, type, key)
  }
}

export function skipTurn () {
  const request = GameCtrl.nextTurn()
  return {
    type: 'UPDATE_GAME_SUCCESS',
    payload: request
  }
}

export function playWord (word, tiles, tally) {
  const request = GameCtrl.playWord(word, tiles, tally)
  return {
    type: 'UPDATE_GAME_SUCCESS',
    payload: request
  }
}

export function addActiveTile (word, tiles, tally) {
  const request = GameCtrl.addActiveTile(word, tiles, tally)
  return {
    type: 'UPDATE_GAME_SUCCESS',
    payload: request
  }
}

export function clearActiveTiles () {
  const request = GameCtrl.clearActiveTiles()
  return {
    type: 'UPDATE_GAME_SUCCESS',
    payload: request
  }
}
