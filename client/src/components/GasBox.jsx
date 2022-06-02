import React from 'react';
import { AiFillWarning } from "react-icons/ai";
import { getDataSensor } from '../apis/sensor/sensor';
import { useSnackbar } from 'notistack';


export default function GasBox(props) {
    // const { listSensor } = props;
    const listSensor = [
        {
            _id: '6294da28a0a99ac9b04e269e',
            typeSensor: 'Gas'
        },
        {
            _id: '6294da56a0a99ac9b04f22bd',
            typeSensor: 'Gas'
        },
        {
            _id: '6298ccf930be07cce922e81a',
            typeSensor: 'Gas'
        },
        {
            _id: '6298cd0730be07cce923362a',
            typeSensor: 'Gas'
        }
    ]
    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = React.useState([]);
    const token = localStorage.getItem('x_access_token');

    React.useEffect(() => {
        setData([]);
        listSensor?.map(sensor => {
            if (sensor.typeSensor === 'Gas') {
                callDetailSensor(sensor);
            }
        })
    }, [JSON.stringify(listSensor)]);
    
    const callDetailSensor = async (sensor) => {
        const response = await getDataSensor(sensor, token);
        if (response.status === 200) {
            setData([...data, response.data?.data?.sensor])
        } else {
            enqueueSnackbar('failed', { variant: 'error' });
        }
    }

    return (
        <div style={{}}>
            {data?.map((sensor) => (
                <div className="p-2 border rounded shadow">
                    <h6><AiFillWarning color="#000000" />gas concentration ch4</h6>
                    <h6 className="pl-3 text-danger">{sensor.data ? sensor.data.toFixed(2) : ''} ppm</h6>
                </div>
            ))}
        </div>
    )
}
