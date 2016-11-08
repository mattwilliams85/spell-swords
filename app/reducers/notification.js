export default function notification (state = null, action) {
  switch (action.type) {
    case 'CREATE_MEDICATION_SUCCESS':
      return { success: 'Medication Successfully Added!' }
    case 'UNSUBSCRIBE_SUCCESS':
    case 'CREATE_TEXT_SUCCESS':
    default:
      return state
  }
}
