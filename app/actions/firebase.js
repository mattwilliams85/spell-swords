import FirebaseAPI from '../api/firebase'

export function unsubscribe (path) {
  const request = FirebaseAPI.unsubscribe(path)
  return {
    type: 'UNSUBSCRIBE_SUCCESS',
    payload: request
  }
}
