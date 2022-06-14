import { 
    getListBuildingSuccess,
    selectBuildingSuccess,
    reqGetListBuilding
} from '../../common/constants';

export const getListBuildingsSuccess = (buildings) => ({
    type: getListBuildingSuccess,
    payload: buildings
})

export const selectBuilding = (building) => ({
    type: selectBuildingSuccess,
    payload: building
})

export const requestGetListBuilding = (token) => ({
    type: reqGetListBuilding,
    payload: {
        token
    }
})