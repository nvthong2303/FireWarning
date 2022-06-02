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
    }
},
{
  timestamps: true
})

module.exports = mongoose.model('sensor', sensorSchema)