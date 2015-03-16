var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://test.mosquitto.org');
client.publish('54fdd08ce13a197b28a990ab', "1111102230-04-1231");

client.end();