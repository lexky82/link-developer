import axios from 'axios';
import {
    USER_INFO
} from './Types';

export async function userInfo(body){
    const request = await axios.post('/api/users/userlist', body)
        .then(response => response.data)
    
    return {
        type: USER_INFO,
        payload: request
    }
}