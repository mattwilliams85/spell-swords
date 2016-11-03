import FireBaseAPI from '../api/medication';

export function deleteMedication(key) {
  FireBaseAPI.deleteMedication(key);
  return {
    type: 'DELETE_MEDICATION_SUCCESS',
  }
}

export function createMedication (brand, generic) {
  const request = FireBaseAPI.createMedication(brand, generic)
  return {
    type: 'CREATE_MEDICATION_SUCCESS',
    payload: request
  }
}

export function subscribeToMedications() {
  return function(dispatch) {
    let type = 'FETCH_MEDICATIONS_SUCCESS'
    FireBaseAPI.subscribeToMedications(dispatch, type);
  }
}
