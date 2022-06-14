import { buildingReducer } from './building.reducer';
import { sensorReducer } from './sensor.reducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    buildingReducer,
    sensorReducer
});

export default rootReducer;
