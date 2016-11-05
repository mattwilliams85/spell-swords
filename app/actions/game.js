import FireBaseAPI from '../api/game'

export function deleteGame (key) {
  FireBaseAPI.deleteGame(key)
  return {
    type: 'DELETE_GAME_SUCCESS'
  }
}

export function createGame (name) {
  const request = FireBaseAPI.createGame(name)
  return {
    type: 'CREATE_GAME_SUCCESS',
    payload: request
  }
}

export function subscribeToGames () {
  return function (dispatch) {
    let type = 'FETCH_GAMES_SUCCESS'
    FireBaseAPI.subscribeToGames(dispatch, type)
  }
}

export function subscribeToGame (key) {
  return function (dispatch) {
    let type = 'FETCH_GAME_SUCCESS'
    FireBaseAPI.subscribeToGame(dispatch, type, key)
  }
}
