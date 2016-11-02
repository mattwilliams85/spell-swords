import {firebaseDb} from './firebase';
import {objectToArray} from '../helpers'

export const medRef = firebaseDb.ref().child('medications')

var FireBaseCtrl = {
  deleteMedication: (key) => {
    return medRef.child(key).remove()
  },

  createMedication: (brand, generic) => {
     return medRef.push({
       brand: brand,
       generic: generic
     }).then(data => { return data})
   },

   subscribeToMedications: (dispatch, type) => {
      medRef.on('value', (snap) => {
        dispatch({
          type: type,
          payload: objectToArray(snap.val())
        })
      })
   }
}

export default FireBaseCtrl;