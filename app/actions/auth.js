import AuthCtrl from '../controllers/auth'

export function loginWithProvider (provider) {
  const request = AuthCtrl.loginWithProvider(provider)
  return {
    type: 'LOGIN_WITH_PROVIDER_FIREBASE',
    payload: request
  }
}

export function registerUser (user) {
  const request = AuthCtrl.registerUser(user)
  return {
    type: 'REGISTER_FIREBASE_USER',
    payload: request
  }
}

export function loginUser (user) {
  const request = AuthCtrl.loginUser(user)
  return {
    type: 'LOGIN_FIREBASE_USER',
    payload: request
  }
}

export function fetchUser () {
  const request = AuthCtrl.fetchUser()
  return {
    type: 'FETCH_FIREBASE_USER',
    payload: request
  }
}

export function updateUser (user) {
  const request = AuthCtrl.updateUserProfile(user)
  return {
    type: 'UPDATE_FIREBASE_USER',
    payload: request
  }
}

export function changePassword (newPassword) {
  const request = AuthCtrl.changePassword(newPassword)
  return {
    type: 'CHANGE_FIREBASE_USER_PASSWORD',
    payload: request
  }
}

export function resetPasswordEmail (email) {
  const request = AuthCtrl.resetPasswordEmail(email)
  return {
    type: 'FIREBASE_PASSWORD_RESET_EMAIL',
    payload: request
  }
}

export function logoutUser (user) {
  const request = AuthCtrl.logoutUser(user)
  return {
    type: 'LOGOUT_FIREBASE_USER',
    payload: request
  }
}
