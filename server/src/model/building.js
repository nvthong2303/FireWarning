const mongoose = require('mongoose')

const buildingSchema = mongoose.Schema({
    buildingName : {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    sensor : {
        type: Array
    },
    warningThresholdGas: {
        type: Number
    },
    warningThresholdCO: {
        type: Number
    },
    warningThresholdHumidity: {
        type: Number
    }
})

module.exports = mongoose.model('building', buildingSchema)