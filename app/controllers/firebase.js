/* global localStorage */
import firebase from 'firebase'
import { FIREBASE_CONFIG } from '../config'

export const firebaseApp = firebase.initializeApp(FIREBASE_CONFIG)
export const firebaseAuth = firebaseApp.auth()
export const firebaseDb = firebaseApp.database()

export function getRef (path) {
  return firebaseDb.ref(path)
}

export function getUid () {
  let user = JSON.parse(localStorage.getItem(localStorage.key(0)))
  return user ? user.uid : ''
}

export function requireAuth (nextState, replace) {
  let uid = getUid()
  if (!uid) {
    replace({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname
      }
    })
  }
}

const FirebaseCtrl = {
  unsubscribe: (path) => {
    getRef(path).off()
  }
}

export default FirebaseCtrl
