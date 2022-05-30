const express = require('express')
const router = express.Router()
const verify = require('../middleware/auth')
const userController = require('../controller/user.controller')

router.post('/login', userController.login)
router.get('/logout', verify, userController.logout)

module.exports = router