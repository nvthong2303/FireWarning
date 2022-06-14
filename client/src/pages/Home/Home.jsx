import React, { useEffect } from 'react';
import Nav from '../../components/Nav';
import HomeHeader from '../../components/HomeHeader';
import HomeMain from '../../components/HomeMain';
import { makeStyles } from '@material-ui/core';
import { getListBuilding } from '../../apis/building/building';
import { getListSensors } from '../../apis/sensor/sensor';
import { useDispatch, useSelector } from 'react-redux';
import { getListBuildingsSuccess, requestGetListBuilding } from '../../store/action/building.action';
import { getListSensorsSuccess } from '../../store/action/sensor.action';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    overflow: 'hidden'
  }
}));

function Home() {
  const classes = useStyles();
  const token = localStorage.getItem('x_access_token');
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const listSensors = useSelector(state => state.sensorReducer.sensors);
  const listBuilding = useSelector(state => state.buildingReducer.buildings)

  useEffect(() => {
    if (listSensors?.length === 0 || !listSensors) {
      _getListSensor();
    }
    if (listBuilding?.length === 0 || !listBuilding) {
      _getListBuilding();
    }
  }, []);

  const _getListBuilding = async () => {
    const response = await getListBuilding(token);
    if (response.status === 200) {
      dispatch(getListBuildingsSuccess(response.data?.data?.listBuilding ?? []))
    } else {
      enqueueSnackbar('get list building failed', { variant: 'error' });
    }
  }

  const _getListSensor = async () => {
    const response = await getListSensors(token);
    if (response.status === 200) {
      dispatch(getListSensorsSuccess(response.data?.data?.listSensors ?? []));
    } else {
      enqueueSnackbar('get list sensor failed', { variant: 'error' });
    }
  }

  return (
    <div className={classes.root}>
      <HomeHeader />
      <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'start' }}>
        <div style={{ width: '15%', height: '100%' }}>
          <Nav />
        </div>
        <div style={{ width: '85%', height: '100%' }}>
          <HomeMain />
        </div>
      </div>
    </div>
  );
}

export default Home;