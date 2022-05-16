const mongoose = require('mongoose')

const buildingSchema = mongoose.Schema({
    buildingName : {
        type: String,
        required: true
    },
    sensor : {
        type: Array
    }
})

module.exports = mongoose.model('building', buildingSchema)