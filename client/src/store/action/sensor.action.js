import { getListSensorSuccess, reqGetListSensor } from '../../common/constants';

export const getListSensorsSuccess = (sensors) => ({
    type: getListSensorSuccess,
    payload: sensors
})

export const requestGetListSensor = (token) => ({
    type: reqGetListSensor,
    payload: {
        token
    }
})