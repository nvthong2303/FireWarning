import { all } from 'redux-saga/effects';
import { watchBuildingAsync } from './building.saga';
import { watchSensorAsync } from './sensor.saga';

export default function* rootSaga() {
    yield all([
        watchBuildingAsync(),
        watchSensorAsync()
    ])
}