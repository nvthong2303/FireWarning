const Sensor = require('../model/sensors');
const statusResponse = require('../common/status');
const { mongoose } = require('mongoose');

const updateDataSensor = async (sensor) => {
    try {
        if (sensor.typeSensor !== 'Temperature') {
            const newSensor = await Sensor.findOneAndUpdate(
                {
                    name: sensor.name 
                },
                { 
                    data: sensor.data, 
                    typeSensor: sensor.typeSensor,
        
                },
                { 
                    upsert: true 
                }
            )
        } else {
            const newSensor = await Sensor.findOneAndUpdate(
                {
                    name: sensor.name 
                },
                { 
                    $push: { 
                        listData: {
                            data: sensor.data,
                            updateAt: sensor.updateAt,
                        }
                    },
                    typeSensor: sensor.typeSensor
                },
                { 
                    upsert: true 
                }
            )
        }
    } catch (error) {
        console.log('update data sensor from mqtt failed', error)
    }
};

module.exports = {
    updateDataSensor
};