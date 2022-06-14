import React from 'react';
import { BiGasPump } from "react-icons/bi";
import { getDataSensor } from '../apis/sensor/sensor';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { GiPoisonCloud } from "react-icons/gi"

export default function GasBox(props) {
    const { sensor } = props;
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = React.useState([]);
    const token = localStorage.getItem('x_access_token');
    const buildingSelected = useSelector(state => state.buildingReducer.buildingSelected)
    const threshold = buildingSelected?.warningThresholdCO;

    React.useEffect(() => {
        callDetailSensor();
        setInterval(() => {
            callDetailSensor();
        }, 10000);
    }, [JSON.stringify(sensor)])

    const callDetailSensor = async () => {
        const response = await getDataSensor(sensor._id, token);
        if (response?.status === 200) {
            setData(response.data?.data?.sensor?.data)
        } else {
            enqueueSnackbar('failed', { variant: 'error' });
        }
    }

    return (
        <div className='mb-2' style={{ border: data > threshold ? '2px solid red' : '' }}>
            <div className="p-2 border rounded shadow">
                <div style={{ display: 'flex', alignItem: 'center' }}>
                    <GiPoisonCloud 
                        color={
                        data > threshold 
                            ? 'red' 
                            : 'black'
                        } 
                        size={20} 
                        style={{ marginRight: '10px' }} 
                    />
                    <h6>{`Nồng độ khí CO ở ${sensor.name}`}</h6>
                </div>
                <Typography 
                    color={
                        data > threshold
                        ? 'secondary' 
                        : 'primary'
                    } 
                    variant='h6'
                >
                    {data} ppm
                </Typography>
            </div>
        </div>
    )
}
