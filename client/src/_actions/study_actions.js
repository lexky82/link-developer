import axios from 'axios';
import {
    STDUY_LIST
} from './studyTypes';

export async function studyList(body){
    const request = await axios.post(`/api/studyPost/studyPosts`, body)
        .then(response => response.data);
    
    return {
        type: STDUY_LIST,
        payload: request
    }
}