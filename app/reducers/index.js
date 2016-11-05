import { combineReducers } from 'redux'
import FireBaseUserReducer from './auth'
import GameReducer from './game'
import NotificationReducer from './notification'

const rootReducer = combineReducers({
  currentUser: FireBaseUserReducer,
  games: GameReducer,
  messages: NotificationReducer
})

export default rootReducer
