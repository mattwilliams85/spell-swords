import {getRef, firebaseAuth} from './firebase'
import GameAPI from './game'

function chatPath (game) {
  return 'games/' + game.key + '/chat'
}

var ChatAPI = {
  createText: (msg) => {
    let game = GameAPI.currentGame()
    let player = firebaseAuth.currentUser

    return new Promise((resolve, reject) => {
      if (GameAPI.isGamePlayer(player)) {
        return getRef(chatPath(game)).push({
          msg: msg,
          player: player.displayName
        }).then(data => { resolve(data) })
      }
    })
  }
}

export default ChatAPI
