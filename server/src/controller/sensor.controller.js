const Sensor = require('../model/sensors');
const statusResponse = require('../common/status');
const { mongoose } = require('mongoose');

const getListSensor = async (req, res) => {
    try {
        const listSensors = await Sensor.find({}).select('name used typeSensor');
        return res.json(statusResponse.OK({ listSensors }))
    } catch (error) {
        console.log('error get list sensor', error);
        return res.json(statusResponse.ERROR({ msg: 'failed' }));
    }
}

const updateDataSensor = async (req, res) => {
    try {
        const newSensor = await Sensor.findOneAndUpdate(
            { 
                name: req.body.name 
            },
            { 
                data: req.body.value, 
                typeSensor: req.body.typeSensor 
            },
            { 
                upsert: true 
            }
        )
        return res.json(statusResponse.OK({ msg: 'update sensor success' }));
    } catch (error) {
        console.log('error update date sensor', error);
        return res.json(statusResponse.ERROR({ msg: 'failed' }));
    }
}

const getDataSensor = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.json(statusResponse.ERROR({ msg: 'get data sensor failed' }));
        }
        const sensor = await Sensor.findById(req.params.id, {
            listData: {
                $slice: -30
            }
        });
        if (sensor) {
            return res.json(statusResponse.OK({ sensor, msg: 'get data sensor success' }));
        } else {
            return res.json(statusResponse.ERROR({ msg: 'get data sensor failed' }));
        }
    } catch (error) {
        console.log('error get data sensor', error);
        return res.json(statusResponse.ERROR({ msg: 'failed' }));
    }
}

module.exports = {
    getListSensor,
    updateDataSensor,
    getDataSensor
}