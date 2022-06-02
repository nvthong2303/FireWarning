const jwt = require("jsonwebtoken")
const Building = require('../model/building')
const statusResponse = require('../common/status')

const addBuilding = async (req, res) => {
    await Building.findOneAndUpdate({
        buildingName: req.body.buildingName
    }, {
        description: req.body.description,
        buildingName: req.body.buildingName,
        warningThresholdGas: req.body.warningThresholdGas,
        warningThresholdCO: req.body.warningThresholdCO,
        warningThresholdHumidity: req.body.warningThresholdHumidity,
    }, {
        upsert: true
    })
    return res.json(statusResponse.OK({ msg: 'add building success' }));
}

const addSensor = async (req, res) => {
    await Building.findByIdAndUpdate(req.body.buildingID, { $push: { sensor: req.body.sensorID }})
    return res.json(statusResponse.OK({ msg: 'add sensor building success' }));
}

const removeSensor = async (req, res) => {
    await Building.findByIdAndUpdate(req.body.buildingID, { $pull: { sensor: req.body.sensorID }})
    return res.json(statusResponse.OK({ msg: 'delete sensor building success' }));
}

const setThreshold = async (req, res) => {
    await Building.findByIdAndUpdate(req.body.buildingID, { 
        warningThresholdGas: req.body.warningThresholdGas,
        warningThresholdCO: req.body.warningThresholdCO,
        warningThresholdHumidity: req.body.warningThresholdHumidity,
    })
    return res.json(statusResponse.OK({ msg: 'update building success' }));
}

const getListBuilding = async (req, res) => {
    const listBuilding = await Building.find({});
    return res.json(statusResponse.OK({ listBuilding }))
}

module.exports = {
    addBuilding,
    addSensor,
    setThreshold,
    getListBuilding,
    removeSensor
}