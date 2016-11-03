import {firebaseDb, getRef} from './firebase';
import {uid} from './auth'
import {objectToArray} from '../helpers'

const path = 'medications'

var FireBaseAPI = {
  deleteMedication: (key) => {
    return getRef(path).child(key).remove()
  },

  createMedication: (brand, generic) => {
    return getRef(path).push({
      brand: brand,
      generic: generic,
      user_uid: uid
    }).then(data => { return data})
  },

   subscribeToMedications: (dispatch, type) => {
      getRef(path).on('value', (snap) => {
        dispatch({
          type: type,
          payload: objectToArray(snap.val())
        })
      })
   }
}

export default FireBaseAPI;
