import FireBaseCtrl from '../controllers/auth';

export function loginWithProvider(provider) {
  const request = FireBaseCtrl.loginWithProvider(provider);
  return {
    type: 'LOGIN_WITH_PROVIDER_FIREBASE',
    payload: request
  }
}

export function registerUser(user) {
  const request = FireBaseCtrl.registerUser(user);
  return {
    type: 'REGISTER_FIREBASE_USER',
    payload: request
  }
}

export function loginUser(user) {
  const request = FireBaseCtrl.loginUser(user);
  return {
    type: 'LOGIN_FIREBASE_USER',
    payload: request
  }
}

export function fetchUser() {
  const request = FireBaseCtrl.fetchUser();
  return {
    type: 'FETCH_FIREBASE_USER',
    payload: request
  }
}

export function updateUser(user) {
  const request = FireBaseCtrl.updateUserProfile(user);
  return {
    type: 'UPDATE_FIREBASE_USER',
    payload: request
  }
}

export function changePassword(newPassword) {
  const request = FireBaseCtrl.changePassword(newPassword);
  return {
    type: 'CHANGE_FIREBASE_USER_PASSWORD',
    payload: request
  }
}

export function resetPasswordEmail(email) {
  const request = FireBaseCtrl.resetPasswordEmail(email);
  return {
    type: 'FIREBASE_PASSWORD_RESET_EMAIL',
    payload: request
  }
}

export function logoutUser(user) {
  const request = FireBaseCtrl.logoutUser(user);
  return {
    type: 'LOGOUT_FIREBASE_USER',
    payload: request
  }
}
