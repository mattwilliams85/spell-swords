import { combineReducers } from 'redux';
import FireBaseUserReducer from './firebase_user_reducer';
import MedicationsReducer from './medication';

const rootReducer = combineReducers({
    currentUser: FireBaseUserReducer,
    medications: MedicationsReducer
});

export default rootReducer;
