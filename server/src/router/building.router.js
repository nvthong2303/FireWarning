const express = require('express')
const router = express.Router()
const verify = require('../middleware/auth')
const buildingController = require('../controller/building.controller')

router.get('/getListBuilding', verify, buildingController.getListBuilding)
router.post('/addBuilding', verify, buildingController.addBuilding)
router.post('/setting/addSensor', verify, buildingController.addSensor)
router.post('/setting/deleteSensor', verify, buildingController.removeSensor)
router.post('/setting/threshold', verify, buildingController.setThreshold)


module.exports = router