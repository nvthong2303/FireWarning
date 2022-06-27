const Sensor = require('../model/sensors');
const Building = require('../model/building');

const updateDataSensor = async (sensor) => {
    try {
        if (sensor.typeSensor !== 'Temperature') {
            const newSensor = await Sensor.findOneAndUpdate(
                {
                    name: sensor.name 
                },
                { 
                    data: sensor.data, 
                    typeSensor: sensor.typeSensor,
        
                },
                { 
                    upsert: true 
                }
            )
        } else {
            const newSensor = await Sensor.findOneAndUpdate(
                {
                    name: sensor.name 
                },
                { 
                    $push: { 
                        listData: {
                            data: sensor.data,
                            updateAt: sensor.updateAt,
                        }
                    },
                    typeSensor: sensor.typeSensor
                },
                { 
                    upsert: true 
                }
            )
        }
    } catch (error) {
        console.log('update data sensor from mqtt failed', error)
    }
};

const checkWarning = async (sensor) => {
    try {
        if (sensor.typeSensor !== 'Temperature') {
            const _sensor = await Sensor.findOne({
                name: sensor.name
            })
            const building = await Building.find({
                sensor: _sensor.id
            });
            if (building) {
                const warningThresholdCO = building.length > 0 ? building[0].warningThresholdCO : 500;
                const warningThresholdGAS = building.length > 0 ? building[0].warningThresholdGAS : 500;
                const warningThresholdHumidity = building.length > 0 ? building[0].warningThresholdHumidity : 50;
    
                switch (sensor.typeSensor) {
                    case 'CO': {
                        return sensor.data > warningThresholdCO;
                        break;
                    }
        
                    case 'GAS': {
                        return sensor.data > warningThresholdGAS
                        break;
                    }
        
                    case 'Humidity': {
                        return sensor.data > warningThresholdHumidity
                        break;
                    }
        
                    default: {
                        return false;
                    }
                }
            }
        }
    } catch (error) {
        console.log('error check warning', error.message);
    }
}

module.exports = {
    updateDataSensor,
    checkWarning
};