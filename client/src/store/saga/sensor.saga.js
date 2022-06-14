import { call, put, takeEvery } from 'redux-saga/effects';
import { getListSensors } from '../../apis/sensor/sensor';
import { reqGetListSensor } from '../../common/constants';
import { getListSensorsSuccess } from '../action/sensor.action';

export const getListSensorSaga = function* ({ payload }) {
    try {
        const { token } = payload;
        let response = yield call(getListSensors, token);
        if (response.status === 200) {
            let listSensors = response.data?.data?.listSensors;
            yield put(getListSensorsSuccess(listSensors))
        }
    } catch (error) {
        console.log('req get list sensor failed', error)
    }
}

export function* watchSensorAsync() {
    yield takeEvery(reqGetListSensor, getListSensorSaga)
}
