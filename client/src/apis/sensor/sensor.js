import axios from 'axios';
import { URL_API } from '../../common/constants';

export async function getListSensors(token) {
    try {
        let config = {
            url: `${URL_API}/sensor/getListSensor`,
            method: 'get',
            headers: {
                'x-access-token': token
            }
        }
        let response = await axios(config)
        return response
    } catch (err) {
        console.log(err);
    }
}

export async function getDataSensor(sensor, token) {
    try {
        let config = {
            url: `${URL_API}/sensor/getDataSensor?id=${sensor._id}`,
            method: 'get',
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
        }
        let response = await axios(config)
        return response
    } catch (err) {
        console.log(err);
    }
}