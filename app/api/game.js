import {browserHistory} from 'react-router'
import {getRef, firebaseAuth} from './firebase'
import {objectToArray} from '../helpers'
import {store} from '../index'

const path = 'games'

var GameAPI = {
  isGamePlayer () {
    let game = GameAPI.currentGame()
    let player = GameAPI.currentPlayer()
    if (game.players.indexOf(player) !== -1) return true
  },

  currentGame: () => {
    return store.getState().games.selected
  },

  currentPlayer: () => {
    return store.getState().currentUser.displayName
  },

  // deleteGame: (player) => {
    // if (!GameAPI.isGamePlayer(player)) return
    // return getRef(path).child(game.key).remove()
  // },

  createGame: (name) => {
    let player1 = firebaseAuth.currentUser.displayName
    let newGame = {
      players: [player1],
      playerTurn: 0,
      chat: []
    }
    return getRef(path).push(newGame).then(data => {
      browserHistory.push(path + '/' + data.key)
      return newGame
    })
  },

  joinGame: (game) => {
    let player = firebaseAuth.currentUser.displayName
    if (game.players.length === 2 || GameAPI.isGamePlayer()) return
    game.players.push(player)
    return getRef(path + '/' + game._key).update(game).then(
      browserHistory.push(path + '/' + game._key)
    )
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
      let results = snap.val()
      results.key = key
      results.chat = objectToArray(results.chat)
      dispatch({
        type: type,
        payload: results
      })
    })
  }
}

export default GameAPI
