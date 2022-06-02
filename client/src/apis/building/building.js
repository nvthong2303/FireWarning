import axios from 'axios';
import { URL_API } from '../../common/constants';

export async function getListBuilding(token) {
    try {
        let config = {
            url: `${URL_API}/building/getListBuilding`,
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

export async function addSensorBuilding(building, sensor, token) {
    try {
        const data = JSON.stringify({
            buildingID: building._id,
            sensorID: sensor._id
        });
        let config = {
            url: `${URL_API}/building/setting/addSensor`,
            method: 'post',
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
            data
        }
        let response = await axios(config)
        return response
    } catch (err) {
        console.log(err);
        
    }
}

export async function deleteSensorBuilding(building, sensor, token) {
    try {
        const data = JSON.stringify({
            buildingID: building._id,
            sensorID: sensor._id
        });
        let config = {
            url: `${URL_API}/building/setting/deleteSensor`,
            method: 'post',
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
            data
        }
        let response = await axios(config)
        return response
    } catch (err) {
        console.log(err);
        
    }
}

export async function updateThresholdBuilding(building, data, token) {
    try {
        const _data = JSON.stringify({
            buildingID: building._id,
            warningThresholdGas: data.warningThresholdGas,
            warningThresholdCO: data.warningThresholdCO,
            warningThresholdHumidity: data.warningThresholdHumidity
          });
        let config = {
            url: `${URL_API}/building/setting/threshold`,
            method: 'post',
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
            data: _data
        }
        let response = await axios(config)
        return response
    } catch (err) {
        console.log(err);
        
    }
}

export async function addNewBuilding(data, token) {
    try {
        const _data = JSON.stringify({
            buildingName: data.buildingName,
            description: data.description,
            warningThresholdGas: data.warningThresholdGas,
            warningThresholdCO: data.warningThresholdCO,
            warningThresholdHumidity: data.warningThresholdHumidity
          });
        let config = {
            url: `${URL_API}/building/addBuilding`,
            method: 'post',
            headers: {
                'x-access-token': token,
                'Content-Type': 'application/json'
            },
            data: _data
        }
        let response = await axios(config)
        return response
    } catch (err) {
        console.log(err);
    }
}