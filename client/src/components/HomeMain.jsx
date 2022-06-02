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
import { getListBuilding } from '../apis/building/building';
import { useSnackbar } from 'notistack';
import PipeLine from './PipeLine';
import GasBox from './GasBox';

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
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = React.useState(false);
    const [dataChart, setDataChart] = React.useState([]);
    const [dataCH4, setDataCH4] = React.useState();
    const [dataCO, setDataCO] = React.useState();

    const [listBuilding, setListBuilding] = React.useState([]);
    const [buildingSelected, setBuildingSelected] = React.useState(listBuilding?.[0])


    const token = localStorage.getItem('x_access_token');


    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(async () => {
        callListBuilding();
        setOpen(true);
        await getDataSensor();
        setOpen(false);

        // setInterval(async () => {
        //     await getDataSensor();
        // }, 10000)
    }, []);

    const callListBuilding = async () => {
        const response = await getListBuilding(token);
        if (response.status === 200) {
            setListBuilding(response.data.data.listBuilding)
        } else {
            enqueueSnackbar('failed', { variant: 'error' });
        }
    }

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
    }

    const handleSelectBuilding = (building) => {
        setBuildingSelected(building);
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
                        {/* <WarningCH4Box data={dataCH4} /> */}
                        <GasBox />
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
