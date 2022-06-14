/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */
import { getListSensorSuccess } from '../../common/constants';
import { cloneDeep } from 'lodash';

const INITIAL_STATE = {
	sensors: []
}

export const sensorReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case getListSensorSuccess: {
            let newState = cloneDeep(state);
            newState.sensors = action.payload;
            return newState;
        }
        
		default:
			return state;
	}
};
