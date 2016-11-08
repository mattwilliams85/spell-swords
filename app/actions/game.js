import GameAPI from '../api/game'

export function deleteGame (key) {
  GameAPI.deleteGame(key)
  return {
    type: 'DELETE_GAME_SUCCESS'
  }
}

export function joinGame (game) {
  GameAPI.joinGame(game)
  return {
    type: 'JOIN_GAME_SUCCESS'
  }
}

export function createGame (name) {
  const request = GameAPI.createGame(name)
  return {
    type: 'CREATE_GAME_SUCCESS',
    payload: request
  }
}

export function subscribeToGames () {
  return function (dispatch) {
    let type = 'FETCH_GAMES_SUCCESS'
    GameAPI.subscribeToGames(dispatch, type)
  }
}

export function subscribeToGame (key) {
  return function (dispatch) {
    let type = 'FETCH_GAME_SUCCESS'
    GameAPI.subscribeToGame(dispatch, type, key)
  }
}
