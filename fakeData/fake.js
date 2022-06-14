const mqtt = require('mqtt')

const options = {
    host: 'broker.hivemq.com',
    port: 1883,
    protocol: 'mqtt',
}

const now = new Date()

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
})

setInterval(() => {
    const dataMQ5_2303 = {
        name: "MQ5-2303",
        data: +(Math.random() * (1000 - 10) + 10).toFixed(2),
        typeSensor: "Gas"
    }
    const dataMQ5_2704 = {
        name: "MQ5-2704",
        data: +(Math.random() * (1000 - 10) + 10).toFixed(2),
        typeSensor: "Gas"
    }
    const dataMQ5_1110 = {
        name: "MQ5-1110",
        data: +(Math.random() * (1000 - 10) + 10).toFixed(2),
        typeSensor: "Gas"
    }
    const dataDHT11_2303 = {
        name: "DHT11-2303",
        data: +(Math.random() * (100 - 30) + 30).toFixed(2),
        typeSensor: "Humidity"
    }
    const dataMQ7_2303 = {
        name: "MQ7_2303",
        data: +(Math.random() * (1000 - 30) + 30).toFixed(2),
        typeSensor: "CO"
    }
    const dataLM393_2303 = {
        name: "LM393_2303",
        data: +(Math.random() * (100 - 30) + 30).toFixed(2),
        typeSensor: "Other"
    }
    const dataMPU9255_2303 = {
        name: "MPU9255_2303",
        data: +(Math.random() * (100 - 30) + 30).toFixed(2),
        typeSensor: "CO"
    }
    const dataTMP36_1110 = {
        name: 'TMP36_1110',
        data: +(Math.random() * (100 - 0) + 0).toFixed(2),
        updateAt: new Date(),
        typeSensor: 'Temperature'
    }
    const dataTMP36_2303 = {
        name: 'TMP36_2303',
        data: +(Math.random() * (100 - 0) + 0).toFixed(2),
        updateAt: new Date(),
        typeSensor: 'Temperature'
    }
    const dataArray = [
        dataMQ5_2303,
        dataMQ5_2704,
        dataMQ5_1110,
        dataDHT11_2303,
        dataMQ7_2303,
        dataLM393_2303,
        dataMPU9255_2303,
        dataTMP36_1110,
        dataTMP36_2303
    ]
    dataArray.map(data => {
        client.publish('/iot/2303', JSON.stringify(data))
    })
}, 5000)
