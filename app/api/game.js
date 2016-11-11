import Firebase from 'firebase'
import { browserHistory } from 'react-router'
import { getRef, firebaseAuth } from './firebase'
import { objectToArray } from '../helpers'
import { store } from '../index'
import { clearGames } from '../actions/game'

const path = 'games'

var GameAPI = {
  isGamePlayer (game) {
    if (!game) game = GameAPI.currentGame()
    let player = GameAPI.currentPlayer()

    if (game.players.indexOf(player) !== -1) return true
  },

  currentGame: () => {
    return store.getState().games.selected
  },

  currentPlayer: () => {
    return store.getState().currentUser.displayName
  },

  clearGames: () => {
    store.dispatch(clearGames())
  },

  deleteGame: (key) => {
    getRef(path + '/' + key).remove().then(
      browserHistory.push('/')
    )
  },

  createGame: (name) => {
    let player1 = firebaseAuth.currentUser.displayName
    let startedAt = Firebase.database.ServerValue.TIMESTAMP
    let newGame = {
      players: [player1],
      playerTurn: 0,
      turnCount: 0,
      chat: [],
      startedAt: startedAt
    }

    return getRef(path).push(newGame).then(data => {
      browserHistory.push(path + '/' + data.key)
      return newGame
    })
  },

  skipTurn: () => {
    let game = GameAPI.currentGame()
    if (game.playerTurn) {
      game.playerTurn = 0
      game.turnCount++
    } else {
      game.playerTurn = 1
    }

    return getRef(path + '/' + game.key).update(game).then(data => {
      return game
    })
  },

  joinGame: (game) => {
    if (game.players[1] || GameAPI.isGamePlayer(game)) return

    let player = firebaseAuth.currentUser.displayName
    game.players[1] = player

    getRef(path + '/' + game._key).update(game).then(
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
      if (!snap.val()) return
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
