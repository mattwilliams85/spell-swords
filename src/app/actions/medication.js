import FireBaseCtrl from '../controllers/medication';

export function deleteMedication(key) {
  FireBaseCtrl.deleteMedication(key);
  return {
    type: 'DELETE_MEDICATION_SUCCESS',
  }
}

export function createMedication (brand, generic) {
  const request = FireBaseCtrl.createMedication(brand, generic)
  return {
    type: 'CREATE_MEDICATION_SUCCESS',
    payload: request
  }
}

export function subscribeToMedications() {
  return function(dispatch) {
    let type = 'FETCH_MEDICATIONS_SUCCESS'
    FireBaseCtrl.subscribeToMedications(dispatch, type);
  }
}