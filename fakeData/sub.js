const mqtt = require('mqtt')

const options = {
    host: 'broker.hivemq.com',
    port: 1883,
    protocol: 'mqtt',
}

const client = mqtt.connect(options);

client.on('connect', () => {
    console.log('connected to mqtt broker');
})

client.subscribe('/topic/qos2303/warning');

client.on('error', (err) => {
    console.log(err)
})

client.on('message', (topic, message) => {
    console.log('Received message:', topic, message.toString());
    if (message.toString().length > 10) {
        const data = JSON.parse(message.toString())
        console.log(data);
    
        if (data.data > 500) {
            console.log('warninggggggggg//////////.......!!!!!!!')
            client.publish("/topic/qos2303/receive", "warningggggggggg......!!!!")
        }
    }
})