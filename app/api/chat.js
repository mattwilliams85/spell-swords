import Firebase from 'firebase'
import GameAPI from './game'
import { getRef } from './firebase'

function chatPath (game) {
  return 'games/' + game.key + '/chat'
}

var ChatAPI = {
  createText: (msg) => {
    let game = GameAPI.currentGame()
    let player = GameAPI.currentPlayer()
    let createdAt = Firebase.database.ServerValue.TIMESTAMP

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
