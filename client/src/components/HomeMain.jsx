import React from 'react';
import {
    Backdrop,
    makeStyles,
    CircularProgress,
    Grid
} from '@material-ui/core';
import SensorChart from './SensorChart';
import { WiHumidity } from 'react-icons/wi';
import { FaTemperatureHigh } from 'react-icons/fa';
import { AiFillWarning } from "react-icons/ai";
import * as apis from '../apis/sensor/index';
import { data } from '../utils/mockData';

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
    }
}));

export default function Main() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dataChart, setDataChart] = React.useState([]);
    const [dataCH4, setDataCH4] = React.useState();
    const [dataCO, setDataCO] = React.useState();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(async () => {
        setOpen(true);
        await getDataSensor();
        setOpen(false);

        // setInterval(async () => {
        //     await getDataSensor();
        // }, 10000)
    }, []);

    function handleClose() {
        setOpen(false);
    }

    function SensorBox({ data }) {
        return (
            <div className="p-2 border rounded shadow">
                <h6><WiHumidity color="#2196f3" />Humidity</h6>
                <h6 className="pl-3 text-primary">{data ? data[1].toFixed(2) : ''} %</h6>
                <h6><FaTemperatureHigh color="#e53935" />Temperature</h6>
                <h6 className="pl-3 text-danger">{data ? data[2].toFixed(2) : ''} °C</h6>
            </div>
        )
    }

    function WarningCH4Box({ data }) {
        return (
            <div className="p-2 border rounded shadow">
                <h6><AiFillWarning color="#000000" />gas concentration ch4</h6>
                <h6 className="pl-3 text-danger">{data ? data.toFixed(2) : ''} ppm</h6>
            </div>
        )
    }

    function WarningCOBox({ data }) {
        return (
            <div className="p-2 border rounded shadow">
                <h6><AiFillWarning color="#000000" />CO concentration</h6>
                <h6 className="pl-3 text-danger">{data ? data.toFixed(2) : ''} ppm</h6>
            </div>
        )
    }

    async function getDataSensor() {
        // const response = await apis.getDataDHT11();
        const response = data;

        const dataChart = response.data.sensors.map(item => [
            item.data.time,
            item.data.humidity,
            item.data.temperature
        ]);
        dataChart.unshift(['time', 'humidity', 'temperature']);

        setDataChart(dataChart);
        setDataCH4(response.data.sensors[response.data.sensors.length - 1].data.ch4);
        setDataCO(response.data.sensors[response.data.sensors.length - 1].data.co);
        console.log(typeof dataCH4)
    }

    return (
        <div className={classes.container}>
            <Backdrop className={classes.Backdrop} open={open} onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <div className={classes.detail}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <SensorChart data={dataChart} />
                    </Grid>
                    <Grid item xs={4}>
                        <SensorBox data={dataChart[dataChart.length - 1]} />
                    </Grid>
                    <Grid item xs={4}>
                        <WarningCOBox data={dataCO} />
                    </Grid>
                    <Grid item xs={4}>
                        <WarningCH4Box data={dataCH4} />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
