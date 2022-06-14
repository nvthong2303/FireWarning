import { call, put, takeEvery } from 'redux-saga/effects';
import { getListBuilding } from '../../apis/building/building';
import { reqGetListBuilding } from '../../common/constants';
import { getListBuildingsSuccess } from '../action/building.action';

export const getListBuildingSaga = function* ({ payload }) {
    try {
        const { token } = payload;
        let response = yield call(getListBuilding, token);
        if (response.status === 200) {
            let listBuilding = response.data?.data?.listBuilding;
            yield put(getListBuildingsSuccess(listBuilding))
        }
    } catch (error) {
        console.log('req get list building failed', error)
    }
}

export function* watchBuildingAsync() {
    yield takeEvery(reqGetListBuilding, getListBuildingSaga)
}
