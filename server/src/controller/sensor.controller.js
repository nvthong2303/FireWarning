const Sensor = require('../model/sensors')
const statusResponse = require('../common/status')

const getListSensor = async (req, res) => {
    const listSensors = await Sensor.find({});
    return res.json(statusResponse.OK({ listSensors }))
}

const updateDataSensor = async (req, res) => {
    const newSensor = await Sensor.findOneAndUpdate({ name: req.body.name }, { data: req.body.value }, { upsert: true })
    return res.json(statusResponse.OK({ msg: 'update sensor success' }));
}

module.exports = {
    getListSensor,
    updateDataSensor
}