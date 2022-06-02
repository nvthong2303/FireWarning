const Sensor = require('../model/sensors')
const statusResponse = require('../common/status')

const getListSensor = async (req, res) => {
    const listSensors = await Sensor.find({});
    return res.json(statusResponse.OK({ listSensors }))
}

const updateDataSensor = async (req, res) => {
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
}

const getDataSensor = async (req, res) => {
    const sensor = await Sensor.findById(req.query.id);
    if (sensor) {
        return res.json(statusResponse.OK({ sensor, msg: 'get data sensor success' }));
    } else {
        return res.json(statusResponse.OK({ msg: 'get data sensor failed' }));
    }
}

module.exports = {
    getListSensor,
    updateDataSensor,
    getDataSensor
}