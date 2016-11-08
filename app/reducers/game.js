let initialState = {
  selected: {
    players: [],
    playerTurn: 0,
    chat: []
  },
  entities: []
}

export default function game (state = initialState, action) {
  switch (action.type) {
    case 'FETCH_GAMES_SUCCESS':
      return {...state, entities: action.payload}
    case 'FETCH_GAME_SUCCESS':
      return {...state, selected: action.payload}
    case 'CREATE_GAME_SUCCESS':
      return {...state, selected: action.payload}
    case 'DELETE_GAME_SUCCESS':
    default:
      return state
  }
}
