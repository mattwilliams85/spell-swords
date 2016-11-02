import FireBaseTools from '../utils/firebase';

export function deleteMedication(key) {
  FireBaseTools.deleteMedication(key);
  return {
    type: 'DELETE_MEDICATION_SUCCESS',
  }
}

export function createMedication (brand, generic) {
  const request = FireBaseTools.createMedication(brand, generic)
  return {
    type: 'CREATE_MEDICATION_SUCCESS',
    payload: request
  }
}

export function subscribeToMedications() {
  return function(dispatch) {
    let type = 'FETCH_MEDICATIONS_SUCCESS'
    FireBaseTools.subscribeToMedications(dispatch, type);
  }
}