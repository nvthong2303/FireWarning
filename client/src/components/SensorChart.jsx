import React from 'react';
import { Chart } from 'react-google-charts';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { getDataSensor } from '../apis/sensor/sensor';
import moment from 'moment'

function SensorChart(props) {
    const { sensor } = props;

    const { enqueueSnackbar } = useSnackbar();
    const [data, setData] = React.useState([]);
    const token = localStorage.getItem('x_access_token');
    // const buildingSelected = useSelector(state => state.buildingReducer.buildingSelected)
    // const threshold = buildingSelected?.warningThresholdGas;

    React.useEffect(() => {
        if (sensor) {
            callDetailSensor();
            setInterval(() => {
                callDetailSensor();
            }, 10000);
        }
    }, [JSON.stringify(sensor)])

    const callDetailSensor = async () => {
        const response = await getDataSensor(sensor._id, token);
        if (response?.status === 200) {
            const dataChart = [];
            response.data?.data?.sensor?.listData?.map(item => {
                dataChart.push([
                    moment(item.updateAt).format('LT'),
                    item.data
                ])
            });
            dataChart?.unshift(['Time', 'Temperature']);
            setData(dataChart)
        } else {
            enqueueSnackbar('failed', { variant: 'error' });
        }
    }

    return (
        <Chart
            width={'100%'}
            height={'400px'}
            chartType="LineChart"
            loader={<div>Loading Chart</div>}
            data={data}
            options={{
                title: 'Temperature Chart',
                hAxis: {
                    title: 'Thời gian',
                },
                vAxis: {
                    title: 'Nhiệt độ (°C)',
                },
                series: {
                    0: { curveType: 'function', color: 'red' }
                },
            }}
        />
    );
}

export default SensorChart;