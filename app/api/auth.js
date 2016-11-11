import firebase from 'firebase'
import { firebaseAuth, getUid } from './firebase'

export let uid = getUid()

var AuthAPI = {
  getProvider: (provider) => {
    switch (provider) {
      case 'email':
        return new firebase.auth.EmailAuthProvider()
      case 'facebook':
        return new firebase.auth.FacebookAuthProvider()
      case 'github':
        return new firebase.auth.GithubAuthProvider()
      case 'google':
        return new firebase.auth.GoogleAuthProvider()
      case 'twitter':
        return new firebase.auth.TwitterAuthProvider()
      default:
    }
  },

  loginWithProvider: (p) => {
    let provider = AuthAPI.getProvider(p)
    return firebaseAuth.signInWithPopup(provider).then(function (result) {
      return firebaseAuth.currentUser
    }).catch(function (error) {
      return {
        errorCode: error.code,
        errorMessage: error.message
      }
    })
  },

  registerUser: (user) => {
    return firebaseAuth.createUserWithEmailAndPassword(user.email, user.password).then(dataUser => {
      return firebaseAuth.currentUser.updateProfile({
        displayName: user.displayName
      }).then(user => {
        return dataUser
      })
    }).catch(error => {
      return {
        errorCode: error.code,
        errorMessage: error.message
      }
    })
  },

  logoutUser: () => {
    return firebaseAuth.signOut().then(() => {
      return {
        success: 1,
        message: 'logout'
      }
    })
  },

  fetchUser: () => {
    return new Promise((resolve, reject) => {
      const unsub = firebaseAuth.onAuthStateChanged(user => {
        if (user) uid = user.uid
        unsub()
        resolve(user)
      }, error => {
        reject(error)
      })
    })
  },

  loginUser: (user) => {
    return firebaseAuth.signInWithEmailAndPassword(user.email, user.password).then(user => {
      return user
    }).catch(error => {
      return {
        errorCode: error.code,
        errorMessage: error.message
      }
    })
  },

  updateUserProfile: (u) => {
    return firebaseAuth.currentUser.updateProfile(u).then(() => {
      return firebaseAuth.currentUser
    }, error => {
      return {
        errorCode: error.code,
        errorMessage: error.message
      }
    })
  },

  resetPasswordEmail: (email) => {
    return firebaseAuth.sendPasswordResetEmail(email).then(() => {
      return {
        message: 'Email sent'
      }
    }, error => {
      return {
        errorCode: error.code,
        errorMessage: error.message
      }
    })
  },

  changePassword: (newPassword) => {
    return firebaseAuth.currentUser.updatePassword(newPassword).then(user => {
      return user
    }, error => {
      return {
        errorCode: error.code,
        errorMessage: error.message
      }
    })
  },

  sendEmailVerification: () => {
    return firebaseAuth.currentUser.sendEmailVerification().then(() => {
      return {
        message: 'Email sent'
      }
    }, error => {
      return {
        errorCode: error.code,
        errorMessage: error.message
      }
    })
  }
}

export default AuthAPI
