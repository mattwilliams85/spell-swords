import { combineReducers } from 'redux';
import FireBaseUserReducer from './auth';
import MedicationsReducer from './medication';
import NotificationReducer from './notification';

const rootReducer = combineReducers({
    currentUser: FireBaseUserReducer,
    medications: MedicationsReducer,
    messages: NotificationReducer
});

export default rootReducer;
