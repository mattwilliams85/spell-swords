import FirebaseCtrl from '../controllers/firebase'

export function unsubscribe (path) {
  const request = FirebaseCtrl.unsubscribe(path)
  return {
    type: 'UNSUBSCRIBE_SUCCESS',
    payload: request
  }
}
