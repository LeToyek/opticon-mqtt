// app.js
const express = require('express');
const mqtt = require('mqtt');

const app = express();
const mqttClient = mqtt.connect('mqtt://mqtt-server'); // Replace 'mqtt-server' with your MQTT broker's address

mqttClient.on('connect', function () {
    console.log('Connected to MQTT broker');
});

app.get('/', (req, res) => {
    res.send('Hello MQTT Server!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
