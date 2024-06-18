// app.js
const express = require('express');
const mqtt = require('mqtt');

const host = process.env.MQTT_HOST
const port = process.env.MQTT_PORT
const clientId = process.env.MQTT_CLIENT_ID

const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: process.env.MQTT_USERNAME,
  password: process.env.MQTT_PASSWORD,
  reconnectPeriod: process.env.MQTT_RECONNECT_PERIOD,
})

console.log(`process.env.MQTT_USERNAME ${process.env.MQTT_USERNAME}`)

const topic = process.env.MQTT_MAIN_TOPIC

client.on('connect', () => {
  console.log('Connected')

  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
    client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
  })
})

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})

const PORT = process.env.PORT || 3000;
const app = express();
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
