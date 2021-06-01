import { combineReducers } from 'redux';
import user from './user_reducer';
import study from './study_reducer'
import userInfo from './userInfo_reducer'

const rootReducer = combineReducers({
    user,
    study,
    userInfo,
});

export default rootReducer;