const jwt = require("jsonwebtoken");
const Building = require('../model/building');
const Sensor = require('../model/sensors');
const statusResponse = require('../common/status');

const addBuilding = async (req, res) => {
    try {
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
    } catch (error) {
        console.log('error add building', error)
        return res.json(statusResponse.ERROR({ msg: 'failed' }));
    }
}

const addSensor = async (req, res) => {
    try {
        await Building.findByIdAndUpdate(
            req.body.buildingID, 
            { 
                $push: { sensor: req.body.sensorID }
            }
        )
        await Sensor.findByIdAndUpdate(
            req.body.sensorID,
            {
                used: true
            }
        )
        return res.json(statusResponse.OK({ msg: 'add sensor building success' }));
    } catch (error) {
        console.log('error add sensor', error)
        return res.json(statusResponse.ERROR({ msg: 'failed' }));
    }
}

const removeSensor = async (req, res) => {
    try {
        await Building.findByIdAndUpdate(
            req.body.buildingID, 
            {  
                $pull: { sensor: req.body.sensorID }
            }
        )
        await Sensor.findByIdAndUpdate(
            req.body.sensorID,
            {
                used: false
            }
        )
        return res.json(statusResponse.OK({ msg: 'delete sensor building success' }));
    } catch (error) {
        console.log('error remove sensor', error)
        return res.json(statusResponse.ERROR({ msg: 'failed' }));
    }
}

const setThreshold = async (req, res) => {
    try {
        await Building.findByIdAndUpdate(req.body.buildingID, { 
            warningThresholdGas: req.body.warningThresholdGas,
            warningThresholdCO: req.body.warningThresholdCO,
            warningThresholdHumidity: req.body.warningThresholdHumidity,
        })
        return res.json(statusResponse.OK({ msg: 'update building success' }));
    } catch (error) {
        console.log('error set threshold', error)
        return res.json(statusResponse.ERROR({ msg: 'failed' }));
    }
}

const getListBuilding = async (req, res) => {
    try {
        const listBuilding = await Building.find({});
        return res.json(statusResponse.OK({ listBuilding }))
    } catch (error) {
        console.log('error get list building', error)
        return res.json(statusResponse.ERROR({ msg: 'failed' }));
    }
}

module.exports = {
    addBuilding,
    addSensor,
    setThreshold,
    getListBuilding,
    removeSensor
}