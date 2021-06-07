import axios from 'axios';
import {
    STDUY_LIST
} from './Types';

export function studyList(body){
    const request = axios.post(`/api/studyPost/studyPosts`, body)
        .then(response => response.data);
    
    return {
        type: STDUY_LIST,
        payload: request
    }
}