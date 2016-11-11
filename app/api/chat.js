import firebase from 'firebase'
import {getRef, firebaseAuth} from './firebase'
import GameAPI from './game'

function chatPath (game) {
  return 'games/' + game.key + '/chat'
}

var ChatAPI = {
  createText: (msg) => {
    let game = GameAPI.currentGame()
    let player = GameAPI.currentPlayer()
    let createdAt = firebase.database.ServerValue.TIMESTAMP

    return new Promise((resolve, reject) => {
      if (GameAPI.isGamePlayer(game)) {
        return getRef(chatPath(game)).push({
          msg: msg,
          player: player,
          createdAt: createdAt
        }).then(data => { resolve(data) })
      }
    })
  }
}

export default ChatAPI
