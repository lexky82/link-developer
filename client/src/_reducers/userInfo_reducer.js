import {
    USER_INFO,
} from '../_actions/Types';
 

export default function(state={}, action){
    switch(action.type){
        case USER_INFO:
            return {...state, userListData: action.payload }
        default:
            return state;
    }
}