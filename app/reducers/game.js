let initialState = {
  selected: {
    players: [],
    playerTurn: 0,
    turnCount: 0,
    chat: [],
    startedAt: null
  },
  entities: []
}

export default function game (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_GAMES_SUCCESS':
      return {...state, entities: action.payload}
    case 'CREATE_GAME_SUCCESS':
    case 'FETCH_GAME_SUCCESS':
    case 'UPDATE_GAME_SUCCESS':
      return {...state, selected: action.payload}
    case 'CLEAR_GAMES':
      return initialState
    case 'DELETE_GAME_SUCCESS':
    default:
      return state
  }
}
