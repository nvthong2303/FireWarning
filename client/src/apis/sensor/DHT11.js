import axios from 'axios';
import { URL_API } from '../../common/constants';

export async function getDataDHT11() {
    try {
        let config = {
            url: `${URL_API}/`,
            method: 'get'
        }
        let response = await axios(config)
        return response
    } catch (err) {
        console.log(err);
    }
}