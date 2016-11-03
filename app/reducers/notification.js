export default function notification (state = null, action) {
  switch (action.type) {
    case 'CREATE_MEDICATION_SUCCESS':
      return { success: 'Medication Successfully Added!'}
    default:
      return state
  }
}