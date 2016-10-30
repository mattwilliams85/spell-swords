export default function medication (state = [], action) {
  switch (action.type) {
    case 'FETCH_MEDICATIONS_SUCCESS':
      return {...state, entities: action.payload}
    default:
      return state
  }
}