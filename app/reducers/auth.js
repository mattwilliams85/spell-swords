export default function (state = null, action) {
  switch (action.type) {
    case 'FETCH_FIREBASE_USER':
    case 'LOGOUT_FIREBASE_USER':
    case 'REGISTER_FIREBASE_USER':
    case 'LOGIN_FIREBASE_USER':
    case 'UPDATE_FIREBASE_USER':
    case 'CHANGE_FIREBASE_USER_PASSWORD':
    case 'FIREBASE_PASSWORD_RESET_EMAIL':
    case 'LOGIN_WITH_PROVIDER_FIREBASE':
      return action.payload
  }
  return state
}
