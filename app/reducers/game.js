export default function game (state = {}, action) {
  switch (action.type) {
    case 'FETCH_GAMES_SUCCESS':
      return {...state, entities: action.payload}
    case 'FETCH_GAME_SUCCESS':
      return {...state, selectedGame: action.payload}
    case 'CREATE_GAME_SUCCESS':
    case 'DELETE_GAME_SUCCESS':
    default:
      return state
  }
}
