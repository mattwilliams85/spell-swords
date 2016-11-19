import chatCtrl from '../controllers/chat'

export function createText (msg, game) {
  const request = chatCtrl.createText(msg, game)
  return {
    type: 'CREATE_TEXT_SUCCESS',
    payload: request
  }
}
