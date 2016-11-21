import Firebase from 'firebase'
import TilesCtrl from './tiles'

import { browserHistory } from 'react-router'
import { getRef, firebaseAuth } from './firebase'
import { objectToArray } from '../helpers'
import { store } from '../index'
import { clearGames } from '../actions/game'

const path = 'games'

const GameCtrl = {
  isGamePlayer (game) {
    if (!game) game = GameCtrl.currentGame()
    let user = firebaseAuth.currentUser
    let gamePlayer = game.players[user.displayName]
    if (!gamePlayer) return
    if (gamePlayer.uid === user.uid) return true
  },

  currentGame: () => {
    return store.getState().games.selected
  },

  currentPlayer: () => {
    return store.getState().currentUser.displayName
  },

  opponent: (game, player) => {
    let array = Object.keys(game.players)
    if (array.indexOf(player) === 0) return array[1]
    return array[0]
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
    let user = firebaseAuth.currentUser
    let startedAt = Firebase.database.ServerValue.TIMESTAMP
    let tiles = TilesCtrl.generateTiles()

    let players = {}
    players[user.displayName] = {
      score: 0,
      uid: user.uid,
      life: 100
    }

    let newGame = {
      players: players,
      playerTurn: 0,
      turnCount: 1,
      chat: [],
      startedAt: startedAt,
      tiles: tiles,
      activeTiles: {clear: true}
    }

    return getRef(path).push(newGame).then(data => {
      browserHistory.push(path + '/' + data.key)
      return newGame
    })
  },

  playWord: (word, tiles, tally) => {
    if (!GameCtrl.isGamePlayer(game)) return
    let game = GameCtrl.currentGame()
    let player = GameCtrl.currentPlayer()
    let opponent = GameCtrl.opponent(game, player)

    game.lastWord = word
    game.players[opponent].life -= tally
    game.tiles = TilesCtrl.replaceTiles(tiles, game.tiles)
    game.activeTiles = {clear: true}
    if (game.players[opponent].life <= 0) game.winner = player

    return getRef(path + '/' + game.key).update(game).then(data => {
      return GameCtrl.nextTurn(game)
    })
  },

  clearActiveTiles: () => {
    let game = GameCtrl.currentGame()
    game.activeTiles = {clear: true}

    return getRef(path + '/' + game.key).update(game).then(data => {
      return game
    })
  },

  addActiveTile: (tile) => {
    let game = GameCtrl.currentGame()
    if (!game.activeTiles) game.activeTiles = {}
    game.activeTiles[tile.id] = tile

    return getRef(path + '/' + game.key).update(game).then(data => {
      return game
    })
  },

  nextTurn: (currentGame) => {
    let game = currentGame || GameCtrl.currentGame()
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
    if (Object.keys(game.players)[1] || GameCtrl.isGamePlayer(game)) return

    let user = firebaseAuth.currentUser
    game.players[user.displayName] = {
      score: 0,
      uid: user.uid,
      life: 100
    }

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

export default GameCtrl
