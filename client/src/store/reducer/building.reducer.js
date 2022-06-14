/* eslint-disable no-fallthrough */
/* eslint-disable import/no-anonymous-default-export */
import { 
	getListBuildingSuccess,
	selectBuildingSuccess
} from '../../common/constants';
import { cloneDeep } from 'lodash';

const INITIAL_STATE = {
	buildings: [],
	buildingSelected: {}
}

export const buildingReducer = (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case getListBuildingSuccess: {
            let newState = cloneDeep(state);
            newState.buildings = action.payload;
			newState.buildingSelected = action.payload?.[0];
            return newState;
        }

		case selectBuildingSuccess: {
			let newState = cloneDeep(state);
            newState.buildingSelected = action.payload;
            return newState;
		}
        
		default:
			return state;
	}
};