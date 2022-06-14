const mongoose = require('mongoose')

const sensorSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    typeSensor: {
        type: String,
        enum: ['Gas', 'CO', 'Humidity', 'Temperature', 'Other'],
        default: 'Other'
    },
    data : {
        type: Number,
        required: true
    },
    listData: {
        type: Array,
        validate: [arrayLimit, '{PATH} exceeds the limit of 10']
    },
    used: {
        type: Boolean,
        default: false
    }
},
{
  timestamps: true
})

function arrayLimit(val) {
    return val.length <= 30;
  }

module.exports = mongoose.model('sensor', sensorSchema)