const express = require('express')
const router = express.Router()
const verify = require('../middleware/auth')
const sensorController = require('../controller/sensor.controller')

router.get('/getListSensor', verify, sensorController.getListSensor)
router.get('/getDataSensor/:id', verify, sensorController.getDataSensor)
router.post('/updateData', verify, sensorController.updateDataSensor)

module.exports = router