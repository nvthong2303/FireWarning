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
    return 'add success'
}

const setThreshold = async (req, res) => {
    return 'setting success'
}

const getListBuilding = async (req, res) => {
    return 'list building'
}

module.exports = {
    addBuilding,
    addSensor,
    setThreshold,
    getListBuilding
}