import FireBaseTools from '../utils/firebase';

export function fetchMedications() {
  const request = FireBaseTools.fetchMedications();
  return {
    type: 'FETCH_MEDICATIONS_SUCCESS',
    payload: request
  }
}

export function deletetMedications() {
  const request = FireBaseTools.deleteMedications();
  return {
    type: 'FETCH_MEDICATIONS_SUCCESS',
    payload: request
  }
}

export function createMedication (brand, generic) {
  const request = FireBaseTools.createMedication(brand, generic).then((v) => {
    console.log(v)
  });
 
  return {
    type: 'CREATE_MEDICATIONS_SUCCESS',
    payload: request
  }
}