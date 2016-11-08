import chatAPI from '../api/chat'

export function createText (msg, game) {
  const request = chatAPI.createText(msg, game)
  return {
    type: 'CREATE_TEXT_SUCCESS',
    payload: request
  }
}
