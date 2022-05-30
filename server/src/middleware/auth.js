const User = require("../model/user")
const jwt = require("jsonwebtoken")
const statusResponse = require("../common/status")
const secret = 'doankythuatmaytinh'

module.exports = function (req, res, next) {
    try {
        const token = req.headers["x-access-token"]
        if (!token) return res.json(statusResponse.ERROR('NULL TOKEN !!!'))
        const verified = jwt.verify(token, secret)
        req.verified = verified
        next()
    } catch (error) {
        res.json(statusResponse.ERROR(error.message))
    }
}