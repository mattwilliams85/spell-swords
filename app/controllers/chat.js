import Firebase from 'firebase'
import GameCtrl from './game'
import { getRef } from './firebase'

function chatPath (game) {
  return 'games/' + game.key + '/chat'
}

var ChatCtrl = {
  createText: (msg) => {
    let game = GameCtrl.currentGame()
    let player = GameCtrl.currentPlayer()
    let createdAt = Firebase.database.ServerValue.TIMESTAMP

    return new Promise((resolve, reject) => {
      if (GameCtrl.isGamePlayer(game)) {
        return getRef(chatPath(game)).push({
          msg: msg,
          player: player,
          createdAt: createdAt
        }).then(data => { resolve(data) })
      }
    })
  }
}

export default ChatCtrl
