import {
    STDUY_LIST,
} from '../_actions/Types';
 

export default function(state={}, action){
    switch(action.type){
        case STDUY_LIST:
            return {...state, studyData: action.payload }
        default:
            return state;
    }
}