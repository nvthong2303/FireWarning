const mongoose = require('mongoose')

const sensorSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
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