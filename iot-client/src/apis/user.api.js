import axios from 'axios';
import { URL_API } from '../common/constants';

export const apiLogin = async (username, password) => {
    let data = JSON.stringify({ username, password });
    let config = {
        method: 'post',
        url: `${URL_API}/login`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };
    let response = await axios(config);
    return response;
}