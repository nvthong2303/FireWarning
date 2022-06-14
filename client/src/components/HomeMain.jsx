/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {
    Backdrop,
    makeStyles,
    CircularProgress,
    Grid,
    Typography
} from '@material-ui/core';
import SensorChart from './SensorChart';
import { WiHumidity } from 'react-icons/wi';
import { FaTemperatureHigh } from 'react-icons/fa';
import { AiFillWarning } from "react-icons/ai";
import { data } from '../utils/mockData';
import PipeLine from './PipeLine';
import GasBox from './GasBox';
import COBox from './COBox';
import HumidityBox from './HumidityBox';
import { useSelector, useDispatch } from 'react-redux';
import { selectBuilding } from '../store/action/building.action';

const useStyles = makeStyles((theme) => ({
    Backdrop: {
        zIndex: 5,
        color: '#fff'
    },
    container: {
        width: '100%',
        height: '100%',
        marginTop: '80px',
    },
    chart: {
        width: '1100px',
        height: '400px'
    },
    detail: {
        marginLeft: '20px',
        marginRight: '20px'
    },
    header: {
        width: '100%',
        height: '50px',
        marginLeft: '20px',
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center'
    }
}));

export default function Main() {
    const classes = useStyles(); 
    const dispatch = useDispatch();  
    const listBuilding = useSelector(state => state.buildingReducer.buildings)
    const listSensors = useSelector(state => state.sensorReducer.sensors)

    const [open, setOpen] = React.useState(false);
    const [buildingSelected, setBuildingSelected] = React.useState(listBuilding?.[0])

    React.useEffect(() => {
        setBuildingSelected(listBuilding?.[0])
    }, [JSON.stringify(listBuilding)]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(async () => {
        setOpen(true);
        setOpen(false);
    }, []);

    function handleClose() {
        setOpen(false);
    }

    const handleSelectBuilding = (building) => {
        setBuildingSelected(building);
        dispatch(selectBuilding(building))
    }

    return (
        <div className={classes.container}>
            <div className={classes.header} onChange={(building) => handleSelectBuilding(building)}>
                <Typography variant='OVERLINE TEXT'>Chọn tòa nhà :</Typography>
                <PipeLine dataItems={listBuilding} onChange={handleSelectBuilding} />
            </div>
            <Backdrop className={classes.Backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={classes.detail}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <div style={{ width: '100%', height: '400px', maxHeight: '400%' }}>
                            {
                                listSensors?.filter(sensor => 
                                    buildingSelected?.sensor?.includes(sensor._id) && sensor.typeSensor === 'Temperature'
                                )?.map(sensor => (
                                    <SensorChart sensor={sensor} />
                                ))
                            }
                            {
                                listSensors?.filter(sensor => 
                                    buildingSelected?.sensor?.includes(sensor._id) && sensor.typeSensor === 'Temperature'
                                )?.length < 1 && (
                                    <>
                                        <img
                                            style={{ height: '80%', width: 'auto%' }}
                                            src='https://store.vtctelecom.com.vn/Content/images/no-data.png'
                                        />
                                    </>
                                )
                            }
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        {
                            listSensors?.filter(sensor => 
                                buildingSelected?.sensor?.includes(sensor._id) && sensor.typeSensor === 'Humidity'
                            )?.map(sensor => (
                                <HumidityBox sensor={sensor} />
                            ))
                        }
                    </Grid>
                    <Grid item xs={4}>
                        {
                            listSensors?.filter(sensor => 
                                buildingSelected?.sensor?.includes(sensor._id) && sensor.typeSensor === 'CO'
                            )?.map(sensor => (
                                <COBox sensor={sensor} />
                            ))
                        }
                    </Grid>
                    <Grid item xs={4}>
                        {
                            listSensors?.filter(sensor => 
                                buildingSelected?.sensor?.includes(sensor._id) && sensor.typeSensor === 'Gas'
                            )?.map(sensor => (
                                <GasBox sensor={sensor} />
                            ))
                        }
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
