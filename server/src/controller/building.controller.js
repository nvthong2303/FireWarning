const jwt = require("jsonwebtoken")
const Building = require('../model/building')
const statusResponse = require('../common/status')

const addBuilding = async (req, res) => {
    await Building.findOneAndUpdate({
        buildingName: req.body.buildingName
    }, {
        buildingName: req.body.buildingName,
        warningThreshold: req.body.warningThreshold
    }, {
        upsert: true
    })
    return res.json(statusResponse.OK({ msg: 'add building success' }));
}

const addSensor = async (req, res) => {
    await Building.findByIdAndUpdate(req.body.buildingID, { $push: { sensor: req.body.sensorID }})
    return res.json(statusResponse.OK({ msg: 'add sensor building success' }));
}

const setThreshold = async (req, res) => {
    await Building.findByIdAndUpdate(req.body.buildingID, { warningThreshold: req.body.warningThreshold })
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
    getListBuilding
}