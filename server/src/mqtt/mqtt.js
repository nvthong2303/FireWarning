const mqtt = require('mqtt');
const { json } = require('body-parser');
const { updateDataSensor, checkWarning } = require('../service/sensor');

const options = {
    host: 'broker.hivemq.com',
    port: 1883,
    protocol: 'mqtt',
}

const topicReceive = '/topic/qos2303/warning';

const client = mqtt.connect(options);

client.on('connect', () => {
    console.log('connect to hive mq broker success');
    client.subscribe(topicReceive)
});

client.on('error', (err) => {
    console.log('error connect hiveMQ :', err)
});

client.on('message', async (topic, msg) => {
    if (msg.toString().length > 10) {
        const data = JSON.parse(msg.toString());
        // check and send warning to esp
        const check = await checkWarning(data);

        if (check) {
            publishMessage();
        }
        // handle data from broker
        updateDataSensor(data)
    }
})

const publishMessage = () => {
    client.publish("/topic/qos2303/receive", "warning...!!!");
}

module.exports = {
    publishMessage
}