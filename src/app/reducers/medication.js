export default function medication (state = [], action) {
  switch (action.type) {
    case 'FETCH_MEDICATIONS_SUCCESS':
    case 'DELETE_MEDICATION_SUCCESS':
    case 'CREATE_MEDICATION_SUCCESS':
      return action.payload
    default:
      return state
  }
}