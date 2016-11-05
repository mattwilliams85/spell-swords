import {getRef, firebaseAuth} from './firebase'
import {objectToArray} from '../helpers'

const path = 'games'

var FireBaseAPI = {
  deleteGame: (key) => {
    return getRef(path).child(key).remove()
  },

  createGame: (name) => {
    let player1 = firebaseAuth.currentUser.displayName
    return getRef(path).push({
      players: [player1],
      playerTurn: 0
    }).then(data => { return data })
  },

  subscribeToGames: (dispatch, type) => {
    getRef(path).on('value', (snap) => {
      dispatch({
        type: type,
        payload: objectToArray(snap.val())
      })
    })
  },

  subscribeToGame: (dispatch, type, key) => {
    getRef(path + '/' + key).on('value', (snap) => {
      dispatch({
        type: type,
        payload: snap.val()
      })
    })
  }
}

export default FireBaseAPI
