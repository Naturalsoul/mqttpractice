const express = require("express")
const mqtt = require("mqtt")
const client = mqtt.connect("mqtt://localhost", {
	protocolId: "MQIsdp",
	protocolVersion: 3,
	will: {
		topic: "dead",
		payload: "mypayload",
		qos: 1,
		retain: true
	}
})

const server = express()

client.on("connect", function() {
	client.subscribe("presence")
	client.publish("presence", "Hi!")

	// client.publish("presence", "Hello World in MQTT!!")
})

client.on("message", function (topic, message) {
	console.log(message.toString())
	// client.end() // This will kill the client
})

server.get("/", function(req, res) {
	client.publish("presence", "Hello again!!")
	res.send("<h1>See the terminal</h1><p>Reload me!! :D")
})

server.listen(8080, function() {
	console.log("Node is listening!!")
})