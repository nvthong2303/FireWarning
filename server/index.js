require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const userRoute = require('./src/router/user.router')
const buildingRoute = require('./src/router/building.router')
const sensorRoute = require('./src/router/sensor.router')

const app = express()
const PORT = 3001;
const MONGODB_URL = 'mongodb+srv://thong:thong@cluster0.vsp6k.mongodb.net/doankythuatmaytinh?retryWrites=true&w=majority'

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected database");
}).catch((err) => {
    console.log(err);
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({ origin: '*' }))

app.use('/', userRoute)
app.use('/building', buildingRoute)
app.use('/sensor', sensorRoute)

app.listen(PORT, () => console.log(`server is running on port ${PORT}`))
