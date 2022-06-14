const mqtt = require('mqtt');
const { json } = require('body-parser');
const { updateDataSensor } = require('../service/sensor');

const options = {
    host: 'broker.hivemq.com',
    port: 1883,
    protocol: 'mqtt',
}

const client = mqtt.connect(options);

client.on('connect', () => {
    console.log('connect to hive mq broker success');
    client.subscribe('/iot/2303')
});

client.on('error', (err) => {
    console.log('error connect hiveMQ :', err)
});

client.on('message', (topic, msg) => {
    const data = JSON.parse(msg.toString());
    // handle data from broker
    updateDataSensor(data)
})

const publish = (topic, data) => {
    client.publish(topic, JSON.stringify(data));
}

module.exports = {
    client,
    publish
}